import { motion } from 'framer-motion'
import { marquee, skills } from '../data/profile'
import { Reveal, Section, ease } from './ui'

export function Skills() {
  return (
    <Section id="skills" eyebrow="registry · skills" title="Tools I reach for" intro="Grouped the way an agent sees its tool registry.">
      <Reveal className="relative mb-12 overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-10 font-display text-xl font-bold text-muted/70">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} aria-hidden={i >= marquee.length}>
              {m}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.group} delay={gi * 0.06} className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="mb-4 flex items-center justify-between font-display text-lg font-bold">
              {group.group}
              <span className="font-mono text-xs font-normal text-muted">{group.items.length} tools</span>
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease, delay: 0.15 + i * 0.03 }}
                  className="cursor-default rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-fg transition hover:-translate-y-0.5 hover:border-teal/60 hover:bg-teal/10"
                >
                  <span className="text-teal">fn </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
