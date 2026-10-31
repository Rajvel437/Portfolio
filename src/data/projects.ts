// To add a project, copy one entry below and edit it. The grid lays itself out.
// - featured: true  → large tile (use for one project at a time)
// - status: 'live' | 'building' | 'work' (work = built for an employer, no public code)

export type Project = {
  title: string
  summary: string
  stack: string[]
  status: 'live' | 'building' | 'work'
  year: string
  org?: string
  featured?: boolean
  links?: { github?: string; demo?: string }
}

export const projects: Project[] = [
  {
    title: 'Enterprise Multi-Agent Platform',
    summary:
      'An orchestrator that routes each task to specialised sub-agents and picks the workflow (sequential, parallel, loop or custom) at runtime. Agents talk over A2A with SPIFFE/SPIRE identity, call third-party APIs through MCP servers, remember sessions in Redis and are traced in Langfuse.',
    stack: ['A2A', 'MCP', 'SPIFFE/SPIRE', 'OAuth / OIDC', 'Redis', 'Cloud Run', 'GKE', 'Langfuse', 'AG-UI'],
    status: 'work',
    org: 'Blackstraw.ai',
    year: '2026',
    featured: true,
  },
  {
    title: 'Semantic Document Search',
    summary: 'A RAG pipeline for semantic search over internal documents, with embeddings stored in PostgreSQL.',
    stack: ['LangChain', 'pgvector', 'sentence-transformers', 'FastAPI'],
    status: 'work',
    org: 'Populus',
    year: '2025',
  },
]
