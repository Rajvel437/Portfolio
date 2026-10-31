import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from './ui'

const agents = [
  { label: 'rag-agent', sub: 'pgvector · RAG', y: 50, tone: 'teal' },
  { label: 'mcp-tools', sub: 'Cloud Run · WIF', y: 125, tone: 'teal' },
  { label: 'memory', sub: 'Redis sessions', y: 200, tone: 'teal' },
  { label: 'evaluator', sub: 'LLM-as-judge', y: 275, tone: 'rose' },
] as const

const edge = (y: number) => `M150 160 C 220 160, 220 ${y}, 290 ${y}`

// The hero's signature: an orchestrator dispatching tasks (teal) to sub-agents
// and receiving results (amber). Slow, quiet loop; static when motion is reduced.
export function AgentGraph() {
  const reduce = useReducedMotion()
  const [flowing, setFlowing] = useState(false)

  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setFlowing(true), 1600)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[0.7rem] text-muted">
        <span>trace · portfolio.request</span>
        <span className="text-teal">4 agents · ok</span>
      </div>
      <div className="rounded-2xl border border-line bg-surface/60 p-3 backdrop-blur-sm sm:p-5">
        <svg viewBox="0 0 420 320" className="h-auto w-full" role="img" aria-label="An orchestrator agent routing work to four sub-agents">
          {agents.map((a, i) => (
            <motion.path
              key={a.label}
              d={edge(a.y)}
              className="fill-none stroke-line"
              strokeWidth={1.25}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.5 + i * 0.12 }}
            />
          ))}

          <motion.g initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease, delay: 0.3 }} style={{ transformOrigin: '85px 160px' }}>
            <rect x="20" y="128" width="130" height="64" rx="12" className="fill-amber/10 stroke-amber/70" strokeWidth={1.25} />
            <text x="36" y="156" className="fill-fg font-mono text-[12px]">orchestrator</text>
            <text x="36" y="175" className="fill-muted font-mono text-[10px]">dynamic workflow</text>
          </motion.g>

          {agents.map((a, i) => (
            <motion.g
              key={a.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.9 + i * 0.12 }}
            >
              <rect
                x="290"
                y={a.y - 22}
                width="120"
                height="44"
                rx="9"
                className={a.tone === 'rose' ? 'fill-surface stroke-rose/60' : 'fill-surface stroke-line'}
                strokeWidth={1.25}
              />
              <circle cx="304" cy={a.y - 4} r="3" className={a.tone === 'rose' ? 'fill-rose' : 'fill-teal'} />
              <text x="314" y={a.y - 1} className="fill-fg font-mono text-[11px]">{a.label}</text>
              <text x="304" y={a.y + 13} className="fill-muted font-mono text-[9.5px]">{a.sub}</text>
            </motion.g>
          ))}

          {flowing &&
            agents.map((a, i) => (
              <g key={a.label}>
                <circle r="3" className="fill-teal" opacity={0.9}>
                  <animateMotion dur="4.8s" begin={`${i * 1.2}s`} repeatCount="indefinite" path={edge(a.y)} />
                </circle>
                <circle r="2.5" className="fill-amber" opacity={0.85}>
                  <animateMotion
                    dur="4.8s"
                    begin={`${i * 1.2 + 2.4}s`}
                    repeatCount="indefinite"
                    path={edge(a.y)}
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </circle>
              </g>
            ))}
        </svg>
      </div>
      <div className="mt-3 flex gap-4 font-mono text-[0.7rem] text-muted">
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-teal" />task</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-amber" />result</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-rose" />eval gate</span>
      </div>
    </div>
  )
}
