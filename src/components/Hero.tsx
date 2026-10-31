import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { experience, profile } from '../data/profile'
import { AgentGraph } from './AgentGraph'
import { Socials, resumeFileName } from './Socials'
import { ease } from './ui'

const current = experience[0]

// Types the intro once on load, then stays still.
function useTypeOnce(text: string, delay: number) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? text : '')

  useEffect(() => {
    if (reduce) return
    let n = 0
    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      interval = setInterval(() => {
        n += 2
        setShown(text.slice(0, n))
        if (n >= text.length) clearInterval(interval)
      }, 22)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, delay, reduce])

  return shown
}

export function Hero() {
  const intro = useTypeOnce(profile.intro, 900)
  const [lead, highlight] = profile.headline
  let wordIndex = 0

  const words = (text: string, className = '') =>
    text.split(' ').map((word) => {
      const i = wordIndex++
      return (
        <motion.span
          key={i}
          className={`inline-block ${className}`}
          initial={{ opacity: 0, y: '40%', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.07 }}
        >
          {word}&nbsp;
        </motion.span>
      )
    })

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-32 sm:px-6 md:pt-40 lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <motion.p
            className="flex items-center gap-2 font-mono text-xs text-teal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-2 w-2 rounded-full bg-teal" />
            {current.title} @ {current.company}
          </motion.p>

          <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            {words(lead)}
            {words(highlight, 'text-amber')}
          </h1>

          <p className="mt-6 min-h-[3.4em] max-w-xl text-lg text-muted" aria-label={profile.intro}>
            <span aria-hidden>{intro}</span>
          </p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.8 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-semibold text-bg transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgb(var(--amber)/0.6)]"
            >
              View projects <ArrowDown size={16} />
            </a>
            <a
              href={profile.resume}
              download={resumeFileName}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-muted"
            >
              <Download size={16} /> Download resume
            </a>
            <Socials />
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {profile.credentials.map((c, i) => (
              <li key={c} className="flex items-center gap-4">
                {i > 0 && <span className="text-line" aria-hidden>·</span>}
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="min-w-0">
          <AgentGraph />
        </div>
      </div>
    </section>
  )
}
