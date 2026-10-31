import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1] as const

// Fades and lifts its children once they scroll into view.
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="mb-12 grid gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-teal">{eyebrow}</p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        {intro && <p className="max-w-2xl text-lg text-muted">{intro}</p>}
      </Reveal>
      {children}
    </section>
  )
}

// Counts from 0 to `to` the first time it enters the viewport.
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    const controls = animate(0, to, { duration: 1.4, ease, onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

export function Chip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'teal' | 'amber' }) {
  const tones = {
    default: 'border-line bg-surface text-muted',
    teal: 'border-teal/30 bg-teal/10 text-teal',
    amber: 'border-amber/30 bg-amber/10 text-amber',
  }
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[0.72rem] ${tones[tone]}`}>{children}</span>
}
