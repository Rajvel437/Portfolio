import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Download, Send } from 'lucide-react'
import { profile } from '../data/profile'
import { Socials, resumeFileName } from './Socials'
import { Reveal, Section, ease } from './ui'

type Message = { from: 'me' | 'them'; text: string }

const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

export function Contact() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'me', text: "Hi, I'm Rajvel. Hiring for an AI or backend role, or want to build something agentic together? Leave a message." },
  ])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked; the address is still visible to select
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || !email.trim()) return
    const sent = text.trim()
    setMessages((m) => [...m, { from: 'them', text: sent }])
    setText('')

    // Without a form key, fall back to the visitor's email app.
    if (!accessKey) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio message from ${name || email}`)}&body=${encodeURIComponent(`${sent}\n\n${name}\n${email}`)}`
      setMessages((m) => [...m, { from: 'me', text: 'Your email app should open with the message filled in. Send it from there and I will reply soon.' }])
      return
    }

    setSending(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, name, email, message: sent, subject: 'New portfolio message' }),
      })
      if (!res.ok) throw new Error()
      setMessages((m) => [...m, { from: 'me', text: `Thanks${name ? `, ${name.split(' ')[0]}` : ''}! Message received. I'll reply to ${email}.` }])
    } catch {
      setMessages((m) => [...m, { from: 'me', text: `That didn't go through. Please email me directly at ${profile.email}.` }])
    } finally {
      setSending(false)
    }
  }

  const field = 'w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none transition placeholder:text-muted focus:border-teal'

  return (
    <Section id="contact" eyebrow="a2a · contact" title="Let's build something agentic.">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="grid content-start gap-6">
          <p className="max-w-md text-lg text-muted">Open to AI engineering and backend roles, freelance agent work, and conversations about multi-agent systems.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="select-all rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-sm">{profile.email}</span>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2.5 text-sm text-muted transition hover:text-fg"
            >
              {copied ? <Check size={15} className="text-teal" /> : <Copy size={15} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Socials />
            <a
              href={profile.resume}
              download={resumeFileName}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-muted transition hover:-translate-y-0.5 hover:border-amber/50 hover:text-fg"
            >
              <Download size={16} /> Resume
            </a>
          </div>
          <p className="font-mono text-xs text-muted">{profile.location}</p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3 font-mono text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-teal" /> rajvel · usually replies within a day
          </div>
          <div className="grid max-h-80 gap-3 overflow-y-auto p-5" aria-live="polite">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === 'me' ? 'rounded-tl-sm bg-surface2' : 'justify-self-end rounded-tr-sm bg-amber/15 text-fg'
                  }`}
                >
                  {m.text}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>
          <form onSubmit={submit} className="grid gap-3 border-t border-line p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="contact-name">Name</label>
              <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} autoComplete="name" />
              <label className="sr-only" htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={field} autoComplete="email" />
            </div>
            <div className="flex gap-2">
              <label className="sr-only" htmlFor="contact-message">Message</label>
              <input id="contact-message" required value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" className={field} />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber px-4 text-sm font-semibold text-bg transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                <Send size={15} /> {sending ? 'Sending' : 'Send'}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
