import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { experience, type Role } from '../data/profile'
import { Chip, Reveal, Section, ease } from './ui'

const months = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}
const now = new Date()
const nowMonths = now.getFullYear() * 12 + now.getMonth()
const axisStart = Math.min(...experience.map((r) => months(r.start)))
const axisLength = nowMonths - axisStart

const formatYm = (ym: string) =>
  new Date(Number(ym.slice(0, 4)), Number(ym.slice(5)) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

const duration = (role: Role) => {
  const total = (role.end ? months(role.end) : nowMonths) - months(role.start) + 1
  const y = Math.floor(total / 12)
  const m = total % 12
  return [y && `${y} yr`, m && `${m} mo`].filter(Boolean).join(' ')
}

function RoleSpan({ role, defaultOpen }: { role: Role; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const start = months(role.start) - axisStart
  const end = (role.end ? months(role.end) : nowMonths) - axisStart
  const left = (start / axisLength) * 100
  const width = Math.max(((end - start) / axisLength) * 100, 2)
  const current = role.end === null

  return (
    <Reveal>
      <article className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
        <button type="button" onClick={() => setOpen((o) => !o)} className="grid w-full gap-4 text-left" aria-expanded={open}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">{role.title}</h3>
              <p className="mt-1 text-muted">
                <span className={current ? 'text-amber' : 'text-fg'}>{role.company}</span> · {formatYm(role.start)} – {role.end ? formatYm(role.end) : 'Present'}
              </p>
            </div>
            <span className="flex items-center gap-2 font-mono text-xs text-muted">
              {duration(role)}
              <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </span>
          </div>

          {/* Root span drawn to scale on a shared career timeline */}
          <div className="relative h-2 rounded-full bg-surface2" aria-hidden>
            <motion.div
              className={`absolute inset-y-0 rounded-full ${current ? 'bg-amber' : 'bg-teal'}`}
              style={{ left: `${left}%`, width: `${width}%`, transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="overflow-hidden"
            >
              <ul className="mt-6 grid gap-3 border-l border-line pl-5">
                {role.spans.map((span, i) => (
                  <motion.li
                    key={span.text}
                    className="relative grid gap-1.5 sm:grid-cols-[120px_1fr] sm:gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease, delay: Math.min(i * 0.05, 0.4) }}
                  >
                    <span className="absolute -left-5 top-3 h-px w-3 bg-line" aria-hidden />
                    <span className="pt-0.5 font-mono text-xs text-teal">{span.tag}</span>
                    <span className="text-[0.95rem] leading-relaxed text-muted">{span.text}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {role.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  )
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="trace · experience"
      title="Where I've worked"
      intro="Each role is a span on one shared timeline. Click a role to collapse or expand what I shipped there."
    >
      <div className="grid gap-5">
        <div className="flex justify-between font-mono text-xs text-muted" aria-hidden>
          <span>{formatYm(experience[experience.length - 1].start)}</span>
          <span>Now</span>
        </div>
        {experience.map((role, i) => (
          <RoleSpan key={role.company} role={role} defaultOpen={i === 0} />
        ))}
      </div>
    </Section>
  )
}
