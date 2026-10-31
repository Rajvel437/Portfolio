import { GraduationCap } from 'lucide-react'
import { education } from '../data/profile'
import { Reveal } from './ui'

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 sm:px-6">
      <Reveal className="flex flex-wrap items-center gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
          <GraduationCap size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-teal">Education</p>
          <h3 className="mt-1 font-display text-xl font-bold">{education.degree}</h3>
          <p className="text-muted">{education.school}</p>
        </div>
        <div className="text-right font-mono text-sm text-muted">
          <p>{education.years}</p>
          <p className="text-fg">{education.score}</p>
        </div>
      </Reveal>
    </section>
  )
}
