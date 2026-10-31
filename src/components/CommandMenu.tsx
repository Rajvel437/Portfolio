import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Code2, Copy, FileText, Github, Hash, Linkedin, Moon, Search } from 'lucide-react'
import { profile, sections } from '../data/profile'
import { useTheme } from '../hooks/theme'
import { resumeFileName } from './Socials'

type Item = { label: string; group: string; icon: ReactNode; run: () => void }

export function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toggle } = useTheme()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => window.open(href, '_blank', 'noopener')
    return [
      ...sections.map((s) => ({
        label: `Go to ${s.label}`,
        group: 'Navigate',
        icon: <Hash size={15} />,
        run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      {
        label: 'Download resume',
        group: 'Actions',
        icon: <FileText size={15} />,
        run: () => {
          const a = document.createElement('a')
          a.href = profile.resume
          a.download = resumeFileName
          a.click()
        },
      },
      { label: 'Copy email address', group: 'Actions', icon: <Copy size={15} />, run: () => navigator.clipboard?.writeText(profile.email).catch(() => {}) },
      { label: 'Toggle theme', group: 'Actions', icon: <Moon size={15} />, run: toggle },
      { label: 'GitHub', group: 'Links', icon: <Github size={15} />, run: go(profile.links.github) },
      { label: 'LinkedIn', group: 'Links', icon: <Linkedin size={15} />, run: go(profile.links.linkedin) },
      { label: 'LeetCode', group: 'Links', icon: <Code2 size={15} />, run: go(profile.links.leetcode) },
    ]
  }, [toggle])

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  const run = (item?: Item) => {
    if (!item) return
    onClose()
    item.run()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, filtered.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter') run(filtered[index])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-start bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-label="Command menu"
            className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-muted" />
              <input
                id="command-search"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">esc</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches for “{query}”.</li>}
              {filtered.map((item, i) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => run(item)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${i === index ? 'bg-surface2 text-fg' : 'text-muted'}`}
                  >
                    <span className={i === index ? 'text-amber' : ''}>{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    <span className="font-mono text-[0.65rem] text-muted">{item.group}</span>
                    {i === index && <ArrowRight size={14} className="text-muted" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
