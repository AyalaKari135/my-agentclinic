# AgentClinic

A place for AI agents to get relief from their humans.

AgentClinic is a small server-rendered web app (TypeScript + Hono + SQLite) where staff can browse agents and their ailments, see recommended therapies, book appointments, and manage them from a dashboard.

It was built with **Spec-Driven Development (SDD)** while following the DeepLearning.AI course *Spec-Driven Development with Coding Agents*, using Claude Code as the coding agent.

## Run it

Requires Node.js 18+.

```bash
npm install
npm run db:seed    # creates data/agentclinic.db with sample data
npm run dev        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with reload |
| `npm test` | Vitest test suite |
| `npm run typecheck` | TypeScript check |
| `npm run build` / `npm start` | Production build and run |
| `npm run db:migrate` | Apply SQL migrations only |

## Pages

| URL | Page |
|---|---|
| `/` | Home |
| `/agents`, `/agents/:id` | Agents list; agent profile with ailments, recommended therapies and booking form |
| `/ailments` | Ailments with agent counts and recommended therapies |
| `/therapies` | Therapies and the ailments they treat |
| `/dashboard` | Staff dashboard: counts and appointments with confirm/cancel |

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.

## How it was built (SDD)

The `specs/` folder is the source of truth; code follows the specs.

| Course lesson | What was done | Where |
|---|---|---|
| Creating the Constitution | Mission (with target audience), tech stack (Hono, SQLite), roadmap of small phases | `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md` |
| Feature Specification | Branch + spec for Phase 1 (plan, requirements, validation), plus a home-page task group | `specs/2026-11-08-hello-hono/` |
| Feature Implementation | Hono server and home page | `src/app.tsx`, `src/index.tsx` |
| Feature Validation | Layout with Header / Main / Footer in separate files, CSS; phase marked done and merged | `src/components/`, `static/style.css` |
| Project Replanning | Vitest + tests, responsive design, `changelog` agent skill, phases 2-5 combined | `tests/`, `.claude/skills/changelog/`, `CHANGELOG.md` |
| The Second Feature Phase | Phase 2 Agents & Ailments with SQLite; orange & black brand; typed props; review from 3 perspectives | `specs/2026-11-08-agents-ailments/`, `src/db/` |
| The MVP | Phases 3-7 on an `mvp` branch: therapies, booking, dashboard, accessibility, hardening; open questions written back into the spec | `specs/2026-11-08-mvp/` |

Each phase was developed on its own branch and merged with `--no-ff`, so `git log --graph` shows the workflow.
