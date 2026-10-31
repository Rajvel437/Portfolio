import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Hammer } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import { profile } from '../data/profile'
import { Chip, Section, ease } from './ui'

const statusLabel = (p: Project) =>
  p.status === 'live' ? 'Live' : p.status === 'building' ? 'In progress' : `Built at ${p.org ?? 'work'}`

// Tracks the cursor so the card's glow follows it.
const trackCursor = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

const cardMotion = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease, delay: i * 0.08 },
})

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const big = project.featured
  return (
    <motion.article
      {...cardMotion(index)}
      onMouseMove={trackCursor}
      className={`spotlight group relative flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-amber/50 ${
        big ? 'md:col-span-2 md:row-span-2 md:p-8' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
        <span className={project.status === 'live' ? 'text-teal' : project.status === 'building' ? 'text-amber' : ''}>{statusLabel(project)}</span>
        <span>{project.year}</span>
      </div>
      <h3 className={`font-display font-bold tracking-tight ${big ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{project.title}</h3>
      <p className={`text-muted ${big ? 'max-w-xl text-base sm:text-lg' : 'text-sm'}`}>{project.summary}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
      {(project.links?.github || project.links?.demo) && (
        <div className="flex gap-4 text-sm">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <Github size={15} /> Code
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              Live demo <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}

function Placeholder({ index }: { index: number }) {
  return (
    <motion.div
      {...cardMotion(index)}
      className="skeleton flex min-h-[200px] flex-col justify-between gap-4 rounded-2xl border border-dashed border-line p-6"
    >
      <span className="flex items-center gap-2 font-mono text-xs text-amber">
        <Hammer size={14} /> in development
      </span>
      <div>
        <p className="font-display text-lg font-bold">Next project is being built</p>
        <p className="mt-1 text-sm text-muted">
          Follow along on{' '}
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-fg underline decoration-line underline-offset-4 hover:decoration-amber">
            GitHub
          </a>
          .
        </p>
      </div>
    </motion.div>
  )
}

export function Projects() {
  // Fill the 3-column grid so the last row is never half empty.
  const cells = projects.reduce((n, p) => n + (p.featured ? 4 : 1), 0)
  let placeholders = (3 - (cells % 3)) % 3
  if (placeholders === 0 && projects.length < 4) placeholders = 3

  return (
    <Section
      id="projects"
      eyebrow="span · projects"
      title="Things I've built"
      intro="Production systems from my work so far. Personal and open-source projects are on the way and will show up here."
    >
      <div className="grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
        {Array.from({ length: placeholders }, (_, i) => (
          <Placeholder key={i} index={projects.length + i} />
        ))}
      </div>
    </Section>
  )
}
