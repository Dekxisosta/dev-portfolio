#!/usr/bin/env node
/**
 * prune.mjs — find (and optionally delete) files this project no longer needs.
 *
 *   npm run prune                  dry run: only lists what it would remove
 *   npm run prune -- --yes         actually delete
 *   npm run prune -- --build       also treat dist/ as removable
 *   npm run prune -- --keep=images/game,sounds   never touch paths containing these
 *
 * What it checks
 *   1. public/    files never referenced by src/, index.html or public/js (by path, file name, or the name as a whole quoted string)
 *   2. src/       files not reachable from src/main.jsx through imports
 *   3. leftovers  logs, .DS_Store, Thumbs.db, *.tmp, *.orig, vite timestamp files, root dev-portfolio-*.zip
 *   4. deps       packages in package.json that nothing imports (reported only; never uninstalled)
 *
 * Matching is deliberately generous: an asset also counts as used if its name appears as a whole
 * quoted string (e.g. img: 'ivory' for `/images/work/${img}.jpg`), so it keeps a few things it could
 * have removed rather than delete something a dynamic path still needs.
 */
import { readdirSync, readFileSync, statSync, rmSync, existsSync, rmdirSync } from 'node:fs'
import { join, resolve, dirname, extname, basename, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const YES = args.includes('--yes')
const BUILD = args.includes('--build')
const KEEP = args.filter((a) => a.startsWith('--keep=')).flatMap((a) => a.slice(7).split(',')).filter(Boolean)

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist'])
const PUBLIC_ALWAYS_KEEP = /^(favicon[^/]*|robots\.txt|sitemap\.xml|manifest\.[^/]+|site\.webmanifest|CNAME|_headers|_redirects|\.htaccess)$/i
const JUNK = /(^|\/)(\.DS_Store|Thumbs\.db|desktop\.ini)$|\.(log|tmp|orig|bak)$|vite\.config\.[jt]s\.timestamp-.*$/i

const posix = (p) => p.split('\\').join('/')
const rel = (p) => posix(relative(ROOT, p))
const fmt = (n) => (n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : n > 1024 ? (n / 1024).toFixed(1) + ' KB' : n + ' B')

function walk(dir, out = [], skipDist = true) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(name) && !(name === 'dist' && !skipDist)) continue
      walk(full, out, skipDist)
    } else out.push(full)
  }
  return out
}
const read = (f) => { try { return readFileSync(f, 'utf8') } catch { return '' } }
const kept = (f) => KEEP.some((k) => rel(f).includes(k))

const remove = new Map() // path -> reason

// ---------- 1. public assets ----------
const corpusFiles = [
  ...walk(join(ROOT, 'src')),
  ...walk(join(ROOT, 'public')).filter((f) => /\.(js|css|html)$/i.test(f)),
  ...['index.html', 'vite.config.js'].map((f) => join(ROOT, f)),
]
const corpus = corpusFiles.map(read).join('\n')
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

for (const f of walk(join(ROOT, 'public'))) {
  const r = posix(relative(join(ROOT, 'public'), f))
  if (PUBLIC_ALWAYS_KEEP.test(basename(f)) || kept(f)) continue
  const stem = basename(f, extname(f))
  const used =
    corpus.includes('/' + r) ||
    corpus.includes(basename(f)) ||
    (stem.length >= 3 && new RegExp('([\'"`])' + esc(stem) + '\\1').test(corpus))
  if (!used) remove.set(f, 'public asset never referenced')
}

// ---------- 2. unreachable src files ----------
const srcDir = join(ROOT, 'src')
const entry = ['main.jsx', 'main.js', 'main.tsx', 'main.ts'].map((n) => join(srcDir, n)).find(existsSync)
if (entry) {
  const seen = new Set()
  const exts = ['', '.js', '.jsx', '.ts', '.tsx', '.css', '.json', '/index.js', '/index.jsx']
  const importRe = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g
  const visit = (file) => {
    if (seen.has(file)) return
    seen.add(file)
    if (!/\.(jsx?|tsx?)$/.test(file)) return
    for (const m of read(file).matchAll(importRe)) {
      const spec = (m[1] || m[2] || m[3] || '').split('?')[0]
      if (!spec.startsWith('.')) continue
      const base = resolve(dirname(file), spec)
      const hit = exts.map((e) => base + e).find((p) => existsSync(p) && statSync(p).isFile())
      if (hit) visit(hit)
    }
  }
  visit(entry)
  for (const f of walk(srcDir)) if (!seen.has(f) && !kept(f)) remove.set(f, 'not imported from ' + rel(entry))
}

// ---------- 3. leftovers ----------
for (const f of walk(ROOT, [], !BUILD)) {
  const r = rel(f)
  if (kept(f)) continue
  if (JUNK.test(r)) remove.set(f, 'junk / temp file')
  else if (!r.includes('/') && /^dev-portfolio.*\.zip$/i.test(r)) remove.set(f, 'old project zip')
  else if (BUILD && r.startsWith('dist/')) remove.set(f, 'build output')
}

// ---------- 4. unused dependencies (report only) ----------
const pkg = JSON.parse(read(join(ROOT, 'package.json')) || '{}')
const ALWAYS = new Set(['vite', '@vitejs/plugin-react', 'react', 'react-dom'])
const cfg = read(join(ROOT, 'vite.config.js'))
const unusedDeps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter(
  (d) => !ALWAYS.has(d) && !corpus.includes(`'${d}`) && !corpus.includes(`"${d}`) && !cfg.includes(d),
)

// ---------- report ----------
const items = [...remove.entries()].sort(([a], [b]) => a.localeCompare(b))
let total = 0
console.log(`\nprune — ${YES ? 'DELETING' : 'dry run (nothing will be deleted)'}\n`)
if (!items.length) console.log('Nothing to remove. Project is clean.')
for (const [f, why] of items) {
  const size = statSync(f).size; total += size
  console.log(`  ${YES ? 'x' : '-'} ${rel(f).padEnd(46)} ${fmt(size).padStart(9)}   ${why}`)
}
if (items.length) console.log(`\n${items.length} file(s), ${fmt(total)} ${YES ? 'removed' : 'would be removed'}.`)
if (unusedDeps.length) console.log(`\nUnused dependencies (not touched): ${unusedDeps.join(', ')}\n  → npm uninstall ${unusedDeps.join(' ')}`)

if (YES) {
  for (const [f] of items) rmSync(f, { force: true })
  // sweep empty folders under public/ and src/
  const sweep = (d) => {
    if (!existsSync(d)) return
    for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) sweep(p) }
    if (!readdirSync(d).length && d !== join(ROOT, 'public') && d !== srcDir) rmdirSync(d)
  }
  sweep(join(ROOT, 'public')); sweep(srcDir)
} else if (items.length) console.log('\nRe-run with --yes to delete.')
console.log()
