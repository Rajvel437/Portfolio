import { profile } from '../data/profile'
import { Socials } from './Socials'

export function Footer() {
  return (
    <footer className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line px-4 py-8 font-mono text-xs text-muted sm:px-6">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <Socials size="sm" />
      <span>
        Press <kbd className="rounded border border-line px-1.5 py-0.5">Ctrl</kbd> + <kbd className="rounded border border-line px-1.5 py-0.5">K</kbd> to navigate
      </span>
    </footer>
  )
}
