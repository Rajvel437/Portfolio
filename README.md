# rajvel.dev

Personal portfolio of Rajvel R, AI Engineer. Built with Vite, React, TypeScript, Tailwind CSS and Framer Motion.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Update content

All text lives in two files. You don't need to touch any component to change content.

| What | File |
| --- | --- |
| Name, links, headline, about, experience, skills, education | `src/data/profile.ts` |
| Projects | `src/data/projects.ts` |
| Resume PDF | `public/Rajvel_R_AI_Engineer.pdf` |

### Add a project

Add one entry to the `projects` array in `src/data/projects.ts`:

```ts
{
  title: 'Agent Eval Harness',
  summary: 'What it does and what problem it solves, in one or two sentences.',
  stack: ['Python', 'LangGraph', 'Langfuse'],
  status: 'live',            // 'live' | 'building' | 'work'
  year: '2026',
  featured: false,           // true = large tile; keep only one featured
  links: { github: 'https://github.com/…', demo: 'https://…' },
},
```

The grid lays itself out. "In development" cards fill empty slots until there are enough projects.

## Contact form

The form sends messages through [Web3Forms](https://web3forms.com) (free). Get an access key with your email, then create `.env.local`:

```
VITE_WEB3FORMS_KEY=your-access-key
```

On Vercel, add the same variable under Project → Settings → Environment Variables. Without a key, the form opens the visitor's email app instead.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repository. Vercel detects Vite automatically.
3. Optional: add a custom domain under Project → Settings → Domains.
