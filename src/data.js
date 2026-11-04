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
  ['Chief Technology Officer', 'AWS Student Builder Group - University of Cabuyao'],
  ['Student Builder Group Lead', 'AWS Student Builder Group - University of Cabuyao'],
  ['System Design and Development Lead', 'AWS Student Builder Group - University of Cabuyao'],
  ['Co-Founder / Product Design Lead', 'KNR Collective'],
  ['VGen Artist', ''],
]


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

export const SHOWCASE = [
  { no: '01', label: 'Dental studio', img: 'ivory', bg: 'linear-gradient(135deg,#efe6d6,#d9c7a3)', p: ['#fbf7ef', '#b8935a', '#2c2418'], name: 'Ivory & Co. Dental Studio', blurb: 'An elegant, trust-building site for a dental practice, rebuilt from a single-file HTML concept into a structured Next.js project.', tags: ['Next.js', 'Healthcare'], live: 'https://ivory-and-co-showcase.vercel.app/', gh: 'https://github.com/Dekxisosta/ivory-and-co-showcase' },
  { no: '02', label: 'Burger joint', img: 'stackd', bg: 'linear-gradient(135deg,#ffd45e,#f08a24)', p: ['#8f1d1d', '#ffd45e', '#fff'], name: 'Stackd Burger Joint', blurb: 'A bold, appetite-first landing page for a burger restaurant, with menu browsing and a food-forward visual identity.', tags: ['Food & Beverage', 'Menu UI'], live: 'https://stackd-showcase.vercel.app/', gh: 'https://github.com/Dekxisosta/stackd-burger-joint-showcase' },
  { no: '03', label: 'Barbershop', img: 'iron', bg: 'linear-gradient(135deg,#3a3d42,#14161a)', p: ['#1d1f23', '#c98a4b', '#f1ece4'], name: 'Iron & Fade Barber', blurb: 'A high-contrast showcase for a multi-branch barbershop, with branch cards, opening hours and booking calls to action.', tags: ['Multi-branch', 'Grooming'], live: 'https://iron-and-fade-barber-showcase.vercel.app/', gh: 'https://github.com/Dekxisosta/iron-and-fade-barber-showcase' },
  { no: '04', label: 'Pet grooming', img: 'paisen', bg: 'linear-gradient(135deg,#bfe6df,#ffd9c2)', p: ['#f4fbf9', '#2a9d8f', '#17413c'], name: 'Paisen Mutt Pet Grooming', blurb: 'A friendly pet grooming and care site generated from a full product requirements document, with public pages and a booking flow.', tags: ['Booking flow', 'Pet care'], live: 'https://paisen-mutt-showcase.vercel.app/', gh: 'https://github.com/Dekxisosta/paisen-mutt-showcase' },
]

export const ROMAN = ['i.', 'ii.', 'iii.', 'iv.', 'v.', 'vi.', 'vii.', 'viii.', 'ix.', 'x.']

export const FULL_NAME = 'Nel Xedrik L. Ariscon'

export const BACKGROUND = [
  ['3rd Year Computer Science Student', 'University of Cabuyao'],
  ['Top 1 Individual Scorer · 2nd Place Team Rankings', 'ACSS Code Cook-off Competition'],
  ['Finalist', 'CodeChum National Programming Competition'],
  ['Member', 'ACSS Research and Development Team'],
  ['Roblox Studio Developer', 'Luau / Lua / Game systems'],
  ['Former Dean’s Lister', 'Our Lady of Fatima University · BS in Accountancy'],
]
