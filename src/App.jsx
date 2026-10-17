import { useMemo, useState, useEffect, useRef } from 'react'
import {
  Home, Layers, Github, Linkedin, Globe, Mail, Search, GraduationCap, ExternalLink, Moon, Sun, Menu, X,
} from 'lucide-react'
import { WORK, COLLAB, AFFILIATIONS, TABS, INTERESTS, STACK, LINKS, GITHUB_USERNAME } from './data.js'

function Entry({ n, t, role, stack, st, url }) {
  return (
    <div className="entry">
      <div>
        <div className="hd"><span className="nm">{n}</span><span className="ti">{t}</span></div>
        <div className="cols">
          <div>
            <span><em>Role: </em>{role}</span>
            <span><em>Stack: </em>{stack}</span>
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer"><ExternalLink size={12} />Live site</a>
            )}
          </div>
          <div>
            {st.map(([Icon, label]) => (
              <span className="s" key={label}><Icon size={13} />{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Chips = ({ items }) => (
  <div className="chips">{items.map((x) => <span key={x}>{x}</span>)}</div>
)

function MikuGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('mikuGameHighScore')
    return saved ? parseInt(saved) : 0
  })
  const [timeLeft, setTimeLeft] = useState(60)
  const [moles, setMoles] = useState(Array(9).fill({ active: false, whacked: false, type: 'miku' }))
  const [feverMode, setFeverMode] = useState(false)
  const [feverProgress, setFeverProgress] = useState(0)
  const [feverTimeLeft, setFeverTimeLeft] = useState(0)

  // Sound effects
  const soundsRef = useRef({
    background: null,
    whack: null,
    sparkle: null,
    bomb: null,
    fever: null,
    start: null,
  })

  // Initialize sounds
  useEffect(() => {
    soundsRef.current = {
      background: new Audio('/sounds/game/background.mp3'),
      whack: new Audio('/sounds/game/whack.mp3'),
      sparkle: new Audio('/sounds/game/sparkle.mp3'),
      bomb: new Audio('/sounds/game/bomb.mp3'),
      fever: new Audio('/sounds/game/fever.mp3'),
      start: new Audio('/sounds/game/start.mp3'),
    }
    
    // Set background music to loop
    if (soundsRef.current.background) {
      soundsRef.current.background.loop = true
      soundsRef.current.background.volume = 0.3
    }

    return () => {
      // Cleanup: pause all sounds
      Object.values(soundsRef.current).forEach(sound => {
        if (sound) {
          sound.pause()
          sound.currentTime = 0
        }
      })
    }
  }, [])

  const playSound = (soundName) => {
    const sound = soundsRef.current[soundName]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(err => console.log('Sound play failed:', err))
    }
  }

  const stopSound = (soundName) => {
    const sound = soundsRef.current[soundName]
    if (sound) {
      sound.pause()
      sound.currentTime = 0
    }
  }

  useEffect(() => {
    if (!gameStarted || gameOver) return

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Fever mode timer
    let feverTimer
    if (feverMode) {
      feverTimer = setInterval(() => {
        setFeverTimeLeft(prev => {
          if (prev <= 0) {
            setFeverMode(false)
            setFeverProgress(0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    // Miku pop-up logic - multiple can appear simultaneously
    const moleInterval = setInterval(() => {
      setMoles(prev => {
        const newMoles = [...prev]
        
        // Randomly activate 1-3 holes
        const numToActivate = Math.floor(Math.random() * 3) + 1
        const availableIndices = newMoles
          .map((val, idx) => !val.active ? idx : -1)
          .filter(idx => idx !== -1)
        
        for (let i = 0; i < numToActivate && availableIndices.length > 0; i++) {
          const randomIdx = Math.floor(Math.random() * availableIndices.length)
          const holeIndex = availableIndices[randomIdx]
          availableIndices.splice(randomIdx, 1)
          
          // Determine what appears: Miku (60%), Gumi (15%), Bomb (25%)
          const rand = Math.random()
          let type = 'miku'
          if (rand < 0.15) {
            type = 'gumi'
          } else if (rand < 0.40) {
            type = 'bomb'
          }
          
          newMoles[holeIndex] = { active: true, whacked: false, type }
          
          // Hide after 1500ms
          setTimeout(() => {
            setMoles(prev => {
              const updated = [...prev]
              if (!updated[holeIndex].whacked) {
                updated[holeIndex] = { active: false, whacked: false, type: 'miku' }
              }
              return updated
            })
          }, 1500)
        }
        
        return newMoles
      })
    }, 800)

    return () => {
      clearInterval(timer)
      clearInterval(moleInterval)
      if (feverTimer) clearInterval(feverTimer)
    }
  }, [gameStarted, gameOver, feverMode])

  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score)
      localStorage.setItem('mikuGameHighScore', score.toString())
    }
  }, [gameOver, score, highScore])

  useEffect(() => {
    // Check if fever mode should be activated
    if (!feverMode && feverProgress >= 100) {
      setFeverMode(true)
      setFeverTimeLeft(5)
      playSound('fever')
    }
  }, [feverProgress, feverMode])

  const whackMiku = (index) => {
    if (!gameStarted || gameOver || !moles[index].active || moles[index].whacked) return
    
    const mole = moles[index]
    
    if (mole.type === 'bomb') {
      // Hit a bomb - game over
      playSound('bomb')
      stopSound('background')
      setGameOver(true)
      return
    }
    
    // Play appropriate sound
    if (mole.type === 'gumi') {
      playSound('sparkle')
    } else {
      playSound('whack')
    }
    
    // Calculate points
    let points = 10
    if (mole.type === 'gumi') {
      points = 50
    }
    if (feverMode) {
      points *= 2
    }
    
    setScore(prev => prev + points)
    
    // Update fever progress (only if not in fever mode)
    if (!feverMode) {
      setFeverProgress(prev => prev + points)
    }
    
    // Show whack indicator briefly
    setMoles(prev => {
      const newMoles = [...prev]
      newMoles[index] = { ...newMoles[index], whacked: true }
      return newMoles
    })

    // Remove the character and X after brief delay
    setTimeout(() => {
      setMoles(prev => {
        const newMoles = [...prev]
        newMoles[index] = { active: false, whacked: false, type: 'miku' }
        return newMoles
      })
    }, 300)
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(60)
    setMoles(Array(9).fill({ active: false, whacked: false, type: 'miku' }))
    setFeverMode(false)
    setFeverProgress(0)
    setFeverTimeLeft(0)
    
    // Play start sound and background music
    playSound('start')
    setTimeout(() => playSound('background'), 500)
  }

  return (
    <div className="panel" key="mg">
      <h2 className="h">Whack-a-Miku</h2>
      <p style={{ marginBottom: 10 }}>Click Miku (+10) & Gumi (+50)! Avoid bombs! Fever mode at 100pts!</p>
      
      <div className="game-container">
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Time: {timeLeft}s</span>
          <span>High Score: {highScore}</span>
          {feverMode && (
            <span className="fever-indicator" style={{ color: 'var(--pink)', fontWeight: 900 }}>
              🔥 FEVER x2 ({feverTimeLeft}s)
            </span>
          )}
          {!feverMode && feverProgress > 0 && (
            <span style={{ fontSize: 12, color: 'var(--mute)' }}>
              Fever: {feverProgress}/100
            </span>
          )}
        </div>

        {!gameStarted || gameOver ? (
          <div className="game-start">
            <p>{gameOver ? `Game Over! Final Score: ${score}` : 'Press START to play'}</p>
            {gameOver && score === highScore && score > 0 && (
              <p style={{ color: 'var(--pink)', fontWeight: 700, marginTop: 8 }}>🎉 NEW HIGH SCORE! 🎉</p>
            )}
            <button 
              className="pbtn" 
              onClick={startGame} 
              type="button"
              aria-label={gameOver ? 'Restart game' : 'Start game'}
            >
              {gameOver ? 'Restart' : 'Start'}
            </button>
          </div>
        ) : null}

        <div className={`whack-grid ${feverMode ? 'fever-mode' : ''}`}>
          {moles.map((mole, index) => (
            <button
              key={index}
              className={`whack-hole ${mole.active ? 'active' : ''}`}
              onClick={() => whackMiku(index)}
              type="button"
              aria-label={mole.active ? `Whack ${mole.type}` : 'Empty hole'}
            >
              <div className="hole-bg"></div>
              {mole.active && !mole.whacked && mole.type === 'miku' && (
                <div className="miku-popup">
                  <img 
                    src="/images/game/whack.webp" 
                    alt="Miku"
                  />
                </div>
              )}
              {mole.active && !mole.whacked && mole.type === 'gumi' && (
                <div className="miku-popup gumi-popup">
                  <img 
                    src="/images/game/gumi.webp" 
                    alt="Gumi"
                  />
                  <div className="bonus-badge">+50</div>
                </div>
              )}
              {mole.active && !mole.whacked && mole.type === 'bomb' && (
                <div className="miku-popup bomb-popup">
                  <img 
                    src="/images/game/bomb.webp" 
                    alt="Bomb"
                  />
                </div>
              )}
              {mole.whacked && (
                <div className="whack-indicator">
                  <svg viewBox="0 0 40 40" width="50" height="50">
                    <line x1="10" y1="10" x2="30" y2="30" stroke="var(--pink)" strokeWidth="4" strokeLinecap="round" />
                    <line x1="30" y1="10" x2="10" y2="30" stroke="var(--pink)" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Navbar({ q, setQ, go, darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="top">
        <button className="lnk" onClick={() => go('projects')}><Home size={14} />Home</button>
        
        {/* Desktop links */}
        <div className="nav-links">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><Github size={14} />GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={14} />LinkedIn</a>
          <a href={LINKS.site} target="_blank" rel="noopener noreferrer"><Globe size={14} />Atelier</a>
        </div>

        <span className="sp" />
        
        <label className="search">
          <Search size={13} />
          <input
            placeholder="Search projects"
            aria-label="Search projects"
            value={q}
            onChange={(e) => { setQ(e.target.value); go('projects') }}
          />
        </label>
        
        <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle theme">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        
        <button className="pbtn" onClick={() => go('projects')}>Hire me</button>
        
        {/* Mobile hamburger */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu portal */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
            <Github size={16} />GitHub
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
            <Linkedin size={16} />LinkedIn
          </a>
          <a href={LINKS.site} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
            <Globe size={16} />Atelier
          </a>
          <button onClick={() => { toggleDarkMode(); setMobileMenuOpen(false); }}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </>
  )
}

function Sidebar() {
  return (
    <aside>
      <h1 className="name">Nel Xedrik Ariscon</h1>
      <div className="handle">@dekxisosta</div>
      <p className="bio">Nel | 22 | Philippines | CTO of AWSSBG UC | Co-founder of KNR Collective. "A coder by contract, an artist by ego."</p>
      <div className="joined"><GraduationCap size={14} />3rd-year BS CS, University of Cabuyao</div>

      <div className="box">
        <h3>:: quick links</h3>
        <a className="pbtn" href={LINKS.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>github.com/dekxisosta</a>
      </div>
      <div className="box">
        <h3>Affiliations</h3>
        {AFFILIATIONS.map(([role, org, image], idx) => (
          <div className="fr" key={idx}>
            {image ? (
              <i style={{ 
                backgroundImage: `url(/images/affiliations/${image}.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              </i>
            ) : (
              <i style={{ 
                background: 'linear-gradient(145deg, var(--pink), var(--b2))',
              }}>
                {role[0].toUpperCase()}
              </i>
            )}
            <div>
              <b>{role}</b>
              {org && <span>{org}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="box obs">
        <h3>Current Interests</h3>
        {INTERESTS.map((x) => <a key={x} href={`#${x}`} onClick={(e) => e.preventDefault()}>#{x}</a>)}
      </div>
    </aside>
  )
}

function Panel({ tab, sub, setSub, list, q }) {
  return (
    <>
      {/* About & Contact - Always visible at top */}
      <div className="panel persistent" key="info">
        <div className="ab">
          <div>
            <h3>:: about me</h3>
            <p>Hello, I'm Nel, a computer science student who writes code for contracts and draws for ego. I build web apps, bots and the occasional game, and I'm comfortable leading a small team.</p>
            <p>Open to freelance art and collaboration. Replies can be slow during school weeks, but I answer everything.</p>
          </div>
          <div className="pic-grid">
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
          </div>
        </div>
      </div>

      {/* Projects Tab */}
      {tab === 'projects' && (
        <div className="panel" key="p">
          <div className="sub">
            <button aria-pressed={sub === 'p'} onClick={() => setSub('p')}>Projects</button>
            <button aria-pressed={sub === 'c'} onClick={() => setSub('c')}>Collabs</button>
          </div>
          {list.length ? list.map((x) => <Entry key={x.n} {...x} />) : <p className="none">No projects match "{q}".</p>}
        </div>
      )}

      {/* Stack Tab */}
      {tab === 'stack' && (
        <div className="panel" key="s">
          <h2 className="h">Stack</h2>
          <p className="grp">:: frontend</p><Chips items={STACK.frontend} />
          <p className="grp">:: backend & data</p><Chips items={STACK.backend} />
          <p className="grp">:: tooling</p><Chips items={STACK.tooling} />
          <p className="grp">:: game development</p><Chips items={STACK.gamedev} />
          <p className="grp">:: design</p><Chips items={STACK.design} />
        </div>
      )}

      {/* Contact Tab */}
      {tab === 'contact' && (
        <div className="panel" key="c">
          <h2 className="h">Contact</h2>
          <p style={{ marginBottom: 14 }}>Commissions, collabs or a code question? Reach out via email or use the form below.</p>
          
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>Email Me</h3>
            <a href="mailto:rroquxii@gmail.com" className="pbtn" style={{ display: 'inline-block' }}>rroquxii@gmail.com</a>
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>Send a Message</h3>
          <form className="contact-form" action={`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID || 'YOUR_FORM_ID'}`} method="POST">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
            <button type="submit" className="pbtn">Send Message</button>
          </form>
        </div>
      )}

      {/* Details Tab */}
      {tab === 'details' && (
        <div className="panel" key="d">
          <h2 className="h">Details</h2>
          
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>About Me</h3>
            <p style={{ fontSize: 12, marginBottom: 8 }}>Hello, I'm Nel, a computer science student who writes code for contracts and draws for ego. I build web apps, bots and the occasional game, and I'm comfortable leading a small team.</p>
            <p style={{ fontSize: 12 }}>Open to freelance art and collaboration. Replies can be slow during school weeks, but I answer everything.</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>Affiliations</h3>
            {AFFILIATIONS.map(([role, org, image], idx) => (
              <div className="fr" key={idx} style={{ paddingLeft: 0 }}>
                {image ? (
                  <i style={{ 
                    backgroundImage: `url(/images/affiliations/${image}.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                  </i>
                ) : (
                  <i style={{ 
                    background: 'linear-gradient(145deg, var(--pink), var(--b2))',
                  }}>
                    {role[0].toUpperCase()}
                  </i>
                )}
                <div>
                  <b>{role}</b>
                  {org && <span>{org}</span>}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>Current Interests</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {INTERESTS.map((x) => (
                <span key={x} style={{ 
                  border: '1px solid var(--line)', 
                  padding: '4px 10px', 
                  fontSize: 11, 
                  borderRadius: 4,
                  color: 'var(--pink-d)',
                  fontWeight: 600
                }}>
                  #{x}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Minigame Tab */}
      {tab === 'minigame' && <MikuGame key="mg" />}
    </>
  )
}

export default function App() {
  const [tab, setTab] = useState('projects')
  const [sub, setSub] = useState('p')
  const [q, setQ] = useState('')
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const tabsRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960 && tab === 'details') {
        setTab('projects')
      }
      
      // Check if tabs need scroll mask
      if (tabsRef.current) {
        const hasScroll = tabsRef.current.scrollWidth > tabsRef.current.clientWidth
        if (hasScroll) {
          tabsRef.current.classList.add('has-scroll')
        } else {
          tabsRef.current.classList.remove('has-scroll')
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [tab])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const petals = useMemo(
    () => Array.from({ length: 14 }, () => ({ l: Math.random() * 95, d: 9 + Math.random() * 9, y: -Math.random() * 14, s: 0.6 + Math.random() * 0.8 })),
    [],
  )
  const list = (sub === 'p' ? WORK : COLLAB).filter((x) =>
    `${x.n} ${x.t} ${x.stack}`.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <>
      <Navbar q={q} setQ={setQ} go={setTab} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="wrap">
        <div className="banner" aria-hidden="true" style={{
          backgroundImage: 'url(/images/profile/background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="banner-credit">Art by Kieed</div>
          {petals.map((p, i) => (
            <i key={i} className="petal" style={{ left: `${p.l}%`, animationDuration: `${p.d}s`, animationDelay: `${p.y}s`, transform: `scale(${p.s})` }} />
          ))}
        </div>
        <header className="head">
          <div className="avatar-wrapper">
            <div className="avatar" role="img" aria-label="Avatar" style={{
              backgroundImage: 'url(/images/profile/profile.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div className="status-indicator" title="Online"></div>
          </div>
          <div className="tabs" role="tablist" ref={(el) => { tabsRef.current = el }}>
            {TABS.map(([id, label]) => (
              <button key={id} className="tab" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>
            ))}
          </div>
        </header>
        <div className="grid">
          <Sidebar />
          <main className="main"><Panel tab={tab} sub={sub} setSub={setSub} list={list} q={q} /></main>
        </div>
      </div>
    </>
  )
}
