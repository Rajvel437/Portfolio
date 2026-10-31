import { Code2, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/profile'

export const socialLinks = [
  { href: profile.links.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: profile.links.github, label: 'GitHub', icon: Github },
  { href: profile.links.leetcode, label: 'LeetCode', icon: Code2 },
]

export function Socials({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-9 w-9 rounded-lg' : 'h-11 w-11 rounded-xl'
  return (
    <ul className="flex gap-3">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className={`grid place-items-center border border-line bg-surface text-muted transition hover:-translate-y-0.5 hover:border-amber/50 hover:text-fg ${box}`}
          >
            <Icon size={size === 'sm' ? 16 : 18} />
          </a>
        </li>
      ))}
    </ul>
  )
}

// Downloads the resume PDF with a readable file name.
export const resumeFileName = profile.resume.split('/').pop() ?? 'resume.pdf'
