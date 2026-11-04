import { useEffect, useState } from 'react'
import heroHtml from './hero.html?raw'
import { WORK, COLLAB, AFFILIATIONS, INTERESTS, STACK, LINKS, SHOWCASE, ROMAN, BACKGROUND, FULL_NAME } from './data.js'

const NAV = [['work', 'Work'], ['projects', 'Index'], ['stack', 'Stack'], ['about', 'About'], ['contact', 'Contact']]

const load = (src) => new Promise((res) => {
  const s = document.createElement('script')
  s.src = src; s.onload = res; s.onerror = res
  document.body.appendChild(s)
})

const isDark = () => {
  const t = document.documentElement.getAttribute('data-theme')
  return t ? t === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches
}

const Head = ({ no, rail, title, em, sub }) => (
  <>
    <div className="rail vt"><b>{no}</b>{rail}</div>
    <div className="sh"><span className="cap">{no}</span><h2>{title} <em>{em}</em></h2></div>
    {sub && <p className="sub">{sub}</p>}
  </>
)

const Chips = ({ title, items }) => (
  <>
    <h3 className="k">{title}</h3>
    <div className="chips">{items.map((x) => <span key={x}>{x}</span>)}</div>
  </>
)

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) return JSON.parse(saved)
    } catch (e) {}
    return matchMedia('(prefers-color-scheme:dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem('darkMode', JSON.stringify(dark)) } catch (e) {}
  }, [dark])

  // Motion reveals + 3D parcel are plain scripts that expect the DOM to exist, so load them after first paint
  useEffect(() => {
    if (window.__portfolioFx) return
    window.__portfolioFx = true
    ;(async () => {
      await load('https://cdn.jsdelivr.net/npm/motion@11.11.13/dist/motion.js')
      await load('/js/reveals.js')
      await load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
      await load('/js/parcel.js')
    })()
  }, [])

  const index = [...WORK, ...COLLAB.map((c) => ({ ...c, collab: true }))]
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'YOUR_FORM_ID'

  return (
    <>
      <div id="bar" />
      <nav>
        <div className="w">
          <b>{FULL_NAME}</b>
          {NAV.map(([id, label]) => <a key={id} className="l" href={`#${id}`}>{label}</a>)}
          <button className="t" id="th" aria-label="Toggle theme" onClick={() => setDark(!isDark())}>◐</button>
        </div>
      </nav>

      <header className="hero" dangerouslySetInnerHTML={{ __html: heroHtml }} />

      <section id="work"><div className="w ruled">
        <Head no="01" rail="Selected work" title="Selected" em="work" sub="Four showcase websites designed and built as concept projects for local-business categories — each open source on GitHub." />
        <div className="grid">
          {SHOWCASE.map((s) => (
            <article className="card" key={s.no}>
              <div className="shot" style={{ background: s.bg }}>
                <span className="vt cv">N° {s.no} — {s.label}</span>
                <div className="win" style={{ '--p2': s.p[0], '--p1': s.p[1], '--tx': s.p[2] }}>
                  <div className="bar"><i /><i /><i /></div>
                  <img alt={`${s.name} website screenshot`} src={`/images/work/${s.img}.jpg`} loading="lazy" />
                </div>
              </div>
              <h3 className="nm">{s.name}</h3>
              <p>{s.blurb}</p>
              <div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="links">
                <a href={s.live} target="_blank" rel="noopener noreferrer">Live site ↗</a>
                <a href={s.gh} target="_blank" rel="noopener noreferrer">View on GitHub →</a>
              </div>
            </article>
          ))}
        </div>
      </div></section>

      <section id="projects"><div className="w ruled">
        <Head no="02" rail="Index of projects" title="The" em="index" sub="Team products, community sites and personal builds." />
        <div className="rows">
          {index.map((x, i) => (
            <div className="row" key={x.n}>
              <span className="n">{ROMAN[i]}</span>
              <div><b>{x.n}</b><small>{x.t}{x.collab ? ` · ${x.role}` : ''}</small></div>
              <div className="d">{[x.collab ? null : x.role, x.stack, ...x.st.map(([, l]) => l)].filter(Boolean).join(' · ')}</div>
              <div className="m">{x.url && <a href={x.url} target="_blank" rel="noopener noreferrer">Live ↗</a>}</div>
            </div>
          ))}
        </div>
      </div></section>

      <section id="stack"><div className="w ruled">
        <Head no="03" rail="Tools of the trade" title="The" em="toolkit" sub="Full-stack web, with roots in game development and design tooling." />
        <div className="two">
          <div><Chips title="Frontend" items={STACK.frontend} /><Chips title="Backend & data" items={STACK.backend} /></div>
          <div><Chips title="Tooling" items={STACK.tooling} /><Chips title="Design" items={STACK.design} /><Chips title="Game development" items={STACK.gamedev} /></div>
        </div>
      </div></section>

      <section id="about"><div className="w ruled">
        <Head no="04" rail="Profile & affiliations" title="The" em="profile" />
        <div className="ab">
          <figure className="ph">
            <div className="fr">
              <img alt={`Portrait of ${FULL_NAME}`} src="/images/profile/portrait.webp" />
              <span className="vt">BS Computer Science · Univ. of Cabuyao</span>
            </div>
            <figcaption className="cap">Fig. 1 — {FULL_NAME}</figcaption>
          </figure>
          <div>
            <p className="dc" style={{ fontSize: 17, margin: 0 }}>I’m a third-year BS Computer Science student at the University of Cabuyao, based in the Philippines. I build web apps, bots and the occasional game, and I’m comfortable leading a small team from planning through deployment.</p>
            <div className="pull">“A coder by contract, an artist by ego.”</div>
            <p style={{ color: 'var(--mute)', margin: 0 }}>Open to freelance web development, art and collaborations. Replies can be slower during school weeks, but I answer everything.</p>
            <h3 className="k" style={{ marginTop: 34 }}>Short background</h3>
            <div className="tl">
              {BACKGROUND.map(([t, d]) => <div key={t}><b>{t}</b><span>{d}</span></div>)}
            </div>
          </div>
          <div className="af">
            <h3 className="k">Leadership & affiliations</h3>
            <div className="tl">
              {AFFILIATIONS.map(([role, org], i) => (
                <div key={i}><b>{role}</b><span>{org || 'Freelance'}</span></div>
              ))}
            </div>
            <h3 className="k" style={{ marginTop: 34 }}>Current interests</h3>
            <div className="chips">{INTERESTS.map((x) => <span key={x}>#{x}</span>)}</div>
          </div>
        </div>
      </div></section>

      <section id="contact" style={{ paddingTop: 0 }}><div className="w"><div className="contact">
        <div className="big vt" aria-hidden="true">Hello</div>
        <div className="cap" style={{ color: 'var(--acc)', marginBottom: 12 }}>05 · Contact</div>
        <h2>Let’s make something <em>worth reading.</em></h2>
        <p>Have a website, a bot or a team project in mind? Send a message and I’ll get back to you.</p>
        <div className="cta" style={{ margin: 0 }}>
          <a className="btn" href="mailto:rroquxii@gmail.com">rroquxii@gmail.com</a>
          <a className="btn o" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn o" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <form action={`https://formspree.io/f/${formId}`} method="POST">
          <input type="text" name="name" placeholder="Your name" required />
          <input type="email" name="email" placeholder="Your email" required />
          <textarea name="message" placeholder="Your message" rows="5" required />
          <button type="submit" className="btn">Send message</button>
        </form>
      </div></div></section>

      <footer>
        <div className="wave" aria-hidden="true"><i /><i /><i /></div>
        <div className="w cap">© 2026 {FULL_NAME} · <a href={LINKS.site} target="_blank" rel="noopener noreferrer">Dekxi Atelier</a></div>
      </footer>
    </>
  )
}
