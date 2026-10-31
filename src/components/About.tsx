import { about } from '../data/profile'
import { Counter, Reveal, Section } from './ui'

export function About() {
  return (
    <Section id="about" eyebrow="span · about" title="AI engineer building agents that hold up in production">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid max-w-2xl gap-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-surface p-6">
              <p className="font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
