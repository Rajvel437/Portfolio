import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Download, Menu, Moon, Sun, X } from 'lucide-react'
import { profile, sections } from '../data/profile'
import { Socials, resumeFileName } from './Socials'
import { useTheme } from '../hooks/theme'
import { useActiveSection } from '../hooks/useActiveSection'
import { ease } from './ui'

const ids = sections.map((s) => s.id)

export function Nav({ onOpenCommand }: { onOpenCommand: () => void }) {
  const active = useActiveSection(ids)
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const iconButton = 'grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/80 text-muted transition hover:text-fg'

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
          scrolled ? 'border-line bg-bg/75 shadow-lg shadow-black/10 backdrop-blur-md' : 'border-transparent'
        }`}
      >
        <a href="#home" className="font-display text-lg font-extrabold tracking-tight">
          rajvel<span className="text-amber">.</span>dev
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/80 p-1 text-sm md:flex">
          {sections.map((s) => (
            <li key={s.id} className="relative">
              {active === s.id && (
                <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-surface2" transition={{ duration: 0.4, ease }} />
              )}
              <a
                href={`#${s.id}`}
                className={`relative block rounded-full px-3.5 py-1.5 transition-colors ${active === s.id ? 'text-fg' : 'text-muted hover:text-fg'}`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-xs text-muted transition hover:text-fg sm:flex"
            aria-label="Open command menu"
          >
            <Command size={13} /> K
          </button>
          <a
            href={profile.resume}
            download={resumeFileName}
            className="hidden items-center gap-1.5 rounded-full bg-amber px-3.5 py-1.5 text-xs font-semibold text-bg transition hover:-translate-y-0.5 sm:flex"
          >
            <Download size={13} /> Resume
          </a>
          <button type="button" onClick={toggle} className={iconButton} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button type="button" onClick={() => setMobileOpen((o) => !o)} className={`${iconButton} md:hidden`} aria-label="Toggle menu" aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            className="mx-auto mt-2 grid max-w-6xl gap-1 rounded-2xl border border-line bg-bg/95 p-2 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-3 ${active === s.id ? 'bg-surface2 text-fg' : 'text-muted'}`}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li className="mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-line px-2 pt-3">
              <Socials size="sm" />
              <a
                href={profile.resume}
                download={resumeFileName}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber px-3.5 py-2 text-sm font-semibold text-bg"
              >
                <Download size={14} /> Resume
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
