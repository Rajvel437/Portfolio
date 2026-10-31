// All personal content lives here. Edit this file to update the site.

export const profile = {
  name: 'Rajvel R',
  role: 'AI Engineer',
  location: 'Chennai, India',
  email: 'rajvelrajvel4@gmail.com',
  // Put your resume PDF in /public with this exact file name.
  resume: '/Rajvel_R_AI_Engineer.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/rajvel-r/',
    github: 'https://github.com/Rajvel437',
    leetcode: 'https://leetcode.com/u/rajvelraju123/',
  },
  headline: ['I build multi-agent systems that', 'ship to production.'],
  intro:
    'AI Engineer in Chennai. Orchestrators, A2A, MCP servers and agent evaluation, plus the secure backend underneath them.',
  credentials: ['A2A', 'MCP', 'SPIFFE/SPIRE', 'OAuth / OIDC', 'GCP', 'Kubernetes', 'FastAPI'],
}

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export const about = {
  paragraphs: [
    'I build multi-agent systems at Blackstraw.ai. An orchestrator picks the right workflow at runtime and hands work to specialised sub-agents. The agents talk over A2A with SPIFFE/SPIRE identity, call third-party APIs through MCP servers, and remember past sessions.',
    'I care about what happens after the demo: evaluation that catches regressions before release, guardrails on every prompt and response, tracing in Langfuse, and keeping model costs in check. My backend years with FastAPI, PostgreSQL and Redis are why these systems hold up in production.',
    "Right now I'm learning in public and building my own agent projects. They'll show up in the Projects section as they ship.",
  ],
  // Swap these for measured impact numbers (cost saved, latency cut, eval pass rate) once you have them.
  stats: [
    { value: 4, suffix: '', label: 'workflow modes the orchestrator chooses between at runtime' },
    { value: 3, suffix: '', label: 'evaluation layers: online monitoring, golden datasets, LLM-as-a-judge' },
    { value: 2, suffix: '', label: 'guardrail checkpoints, on every prompt in and every response out' },
    { value: 2, suffix: '+', label: 'years building production systems, from backend to agents' },
  ],
}

export type Span = { tag: string; text: string }

export type Role = {
  title: string
  company: string
  start: string // YYYY-MM
  end: string | null // null = present
  stack: string[]
  spans: Span[]
}

export const experience: Role[] = [
  {
    title: 'SDE-III, AI / Agentic Systems',
    company: 'Blackstraw.ai',
    start: '2026-06',
    end: null,
    stack: ['Multi-Agent Systems', 'A2A', 'SPIFFE/SPIRE', 'OAuth 2.0 / OIDC', 'MCP', 'Cloud Run', 'GKE', 'Langfuse'],
    spans: [
      { tag: 'orchestration', text: 'Built multi-agent systems where an orchestrator manages specialised sub-agents, with clear system prompts for each agent.' },
      { tag: 'workflow', text: 'Built a dynamic orchestrator that picks a sequential, parallel, loop or custom workflow at runtime based on the task.' },
      { tag: 'a2a', text: 'Set up agent-to-agent communication over the A2A protocol, with SPIFFE/SPIRE identities for agents that need a verifiable identity.' },
      { tag: 'auth', text: 'Added OAuth 2.0 and OIDC login and permissions so both users and individual agents are securely authenticated.' },
      { tag: 'mcp', text: 'Built MCP servers and tools on Cloud Run and on-prem Kubernetes, connected to GCP-hosted agents through Workload Identity Federation.' },
      { tag: 'memory', text: 'Gave agents memory across sessions, and cached conversation memory in Redis to cut response latency.' },
      { tag: 'eval', text: 'Set up agent evaluation with GCP online monitoring, golden-dataset offline evals and LLM-as-a-judge scoring before each release.' },
      { tag: 'safety', text: 'Added guardrails and content-safety checks on prompts and responses, Cloud Armor for prompt-injection defense, and Langfuse tracing.' },
      { tag: 'sdk', text: 'Built a standalone Agent Development Kit, similar to Google ADK, with built-in logging, tracing and observability.' },
      { tag: 'ui', text: "Built the agent frontend on CopilotKit's AG-UI protocol to stream agent responses and actions in real time." },
      { tag: 'cost', text: 'Tracked and optimised model usage costs across agents.' },
    ],
  },
  {
    title: 'Software Engineer, Backend',
    company: 'Populus Empowerment Network',
    start: '2024-01',
    end: '2026-06',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Azure', 'Loki', 'Grafana'],
    spans: [
      { tag: 'perf', text: 'Reduced P95 API latency by 40% with Redis caching and query optimisation on high-traffic endpoints.' },
      { tag: 'migration', text: 'Solely owned the migration of 65M+ MSSQL records to PostgreSQL, finishing 80% faster than estimated.' },
      { tag: 'auth', text: 'Architected a unified JWT + RBAC auth layer for a multi-tenant platform with zero production regressions.' },
      { tag: 'observability', text: 'Built and owned a Loki + Grafana observability stack across 6+ microservices as primary on-call engineer.' },
      { tag: 'rag', text: 'Designed and deployed a RAG pipeline with LangChain, pgvector and sentence-transformers for semantic search over internal documents.' },
      { tag: 'sql', text: 'Fixed N+1 query patterns and missing indexes in legacy SQL, speeding up key reporting endpoints.' },
      { tag: 'api', text: 'Shipped 3+ production REST APIs in FastAPI + SQLAlchemy as an intern and was retained full-time before graduation.' },
    ],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Agentic AI', items: ['Multi-Agent Orchestration', 'A2A Protocol', 'SPIFFE/SPIRE', 'MCP Servers & Tools', 'Function Calling', 'ADK-style SDKs', 'Agent Memory', 'CopilotKit / AG-UI'] },
  { group: 'LLM Evaluation & Safety', items: ['Golden Dataset Evals', 'LLM-as-a-Judge', 'Online / Offline Eval', 'Guardrails', 'Content Safety', 'Prompt-Injection Defense', 'Cloud Armor', 'Langfuse'] },
  { group: 'AI / LLM', items: ['LangChain', 'RAG Pipelines', 'Claude API', 'OpenAI API', 'sentence-transformers', 'pgvector', 'Prompt Engineering'] },
  { group: 'Backend & Security', items: ['Python (AsyncIO)', 'FastAPI', 'Django', 'SQLAlchemy', 'Celery', 'OAuth 2.0', 'OIDC', 'JWT', 'RBAC', 'Workload Identity Federation'] },
  { group: 'Data & Messaging', items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'Kafka'] },
  { group: 'Cloud & DevOps', items: ['Docker', 'GCP Cloud Run', 'GKE', 'Kubernetes', 'Azure', 'CI/CD', 'Loki', 'Grafana'] },
]

export const marquee = ['Python', 'FastAPI', 'A2A', 'MCP', 'LangChain', 'PostgreSQL', 'pgvector', 'Redis', 'Kafka', 'GCP', 'Kubernetes', 'Docker', 'Langfuse', 'Claude API', 'OpenAI API', 'Grafana']

export const education = {
  degree: 'B.E. Computer Science and Engineering',
  school: 'Meenakshi College of Engineering',
  years: '2020 – 2024',
  score: 'CGPA 8.06',
}
