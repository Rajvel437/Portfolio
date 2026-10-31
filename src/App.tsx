import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './hooks/theme'
import { Nav } from './components/Nav'
import { CommandMenu } from './components/CommandMenu'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Nav onOpenCommand={() => setCommandOpen(true)} />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
        <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} />
      </MotionConfig>
    </ThemeProvider>
  )
}
