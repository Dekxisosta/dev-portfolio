import { Users, GitCommit, Star } from 'lucide-react'

export const WORK = [
  { n: 'Voltraak', t: 'Inventory system', role: 'Project & Frontend Lead', stack: 'React, Laravel, MySQL', st: [[Users, '5 people'], [GitCommit, '100 commits']], url: 'https://voltraak.vercel.app' },
  { n: 'Yu Perennia', t: 'Discord bot', role: 'v0.0.18, in development', stack: 'Python, discord.py', st: [[Star, '3 stars']] },
  { n: 'Zenless Collective', t: 'E-commerce platform', role: 'Frontend & UI', stack: 'React, Laravel, MySQL', st: [[Users, '5 people'], [GitCommit, '56 commits']] },
  { n: 'AWSSBG-UC', t: 'Organization site', role: 'CTO of the org', stack: 'Next.js, Supabase', st: [[GitCommit, '33 commits']], url: 'https://awssbguc-web.vercel.app' },
  { n: 'Dekxi Atelier', t: 'Personal site', role: 'Solo build', stack: 'Next.js, Supabase', st: [[GitCommit, '45 commits'], [Star, '2 stars']], url: 'https://dekxi-atelier.vercel.app' },
  { n: 'QuickMart', t: 'Star Rail POS terminal', role: 'Built in 2 days', stack: 'Java Swing', st: [[Star, '2 stars']] },
]

export const COLLAB = [
  { n: 'PinaCall', t: 'University portal', role: 'with reiy-git', stack: 'Laravel 13, Vue 3, TypeScript', st: [[GitCommit, '3 commits']], url: 'https://pina-call.vercel.app' },
  { n: 'Waytrans', t: 'Screen OCR translator', role: 'with remsysc', stack: 'Python, Tesseract', st: [[GitCommit, '23 commits']] },
]

export const AFFILIATIONS = [
  ['Chief Technology Officer', 'AWS Student Builder Group - University of Cabuyao', 'awsuc'],
  ['Student Builder Group Lead', 'AWS Student Builder Group - University of Cabuyao', 'awsuc'],
  ['System Design and Development Lead', 'AWS Student Builder Group - University of Cabuyao', 'awsuc'],
  ['R&D Committee Member', 'ACSS', 'acss'],
  ['Co-Founder / Product Design Lead', 'KNR Collective', 'knr'],
  ['VGen Artist', '', 'vgen'],
  ['Roblox Scripter', '', 'roblox'],
]

export const TABS = [['projects', 'Projects'], ['stack', 'Stack'], ['minigame', 'Minigame'], ['contact', 'Contact']]

export const INTERESTS = ['digitalart', 'characterdesign', 'gamedev', 'opensource', 'indiegames']

export const STACK = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React 18', 'Vite', 'Tailwind', 'React Router', 'TanStack Query', 'MSW', 'Recharts', 'Vitest', 'Next.js', 'TypeScript', 'Vue', 'SCSS'],
  backend: ['Laravel / PHP', 'Python', 'discord.py', 'Java', 'C#', 'JavaFX', 'Java Swing', 'MySQL', 'PostgreSQL', 'Supabase', 'Redis', 'SQLite', 'Lua'],
  tooling: ['NPM', 'Bun', 'Docker Compose', 'Nginx', 'Vercel', 'CachyOS', 'Git'],
  gamedev: ['Godot', 'RPG Maker MZ', 'Roblox Studio'],
  design: ['Figma', 'Canva', 'Clip Studio Paint', 'IbisPaint X'],
}

export const LINKS = {
  github: 'https://github.com/dekxisosta',
  linkedin: 'https://www.linkedin.com/in/nel-xedrik-ariscon-9b7a40387/',
  site: 'https://dekxi-atelier.vercel.app/',
}

export const GITHUB_USERNAME = 'dekxisosta'
