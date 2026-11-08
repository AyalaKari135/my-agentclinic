# Requirements — Phase 2: Agents & Ailments

## Scope

Add a SQLite database and the first real content: agents and the ailments they suffer from. Visitors can list agents, open an agent's profile, and browse the ailments catalog.

## In Scope

- SQLite database via `better-sqlite3`, file `data/agentclinic.db` (ignored by git).
- Plain SQL migration files in `src/db/migrations/`, applied in order and recorded in a `schema_migrations` table.
- Tables: `agents`, `ailments`, and the join table `agent_ailments` (many-to-many).
- Idempotent seed script (`npm run db:seed`) with 6 fictional agents and 6 ailments.
- Pages:
  - `GET /agents` — table of all agents (name, model, status), each name links to its profile.
  - `GET /agents/:id` — name, model, status, presenting complaint, list of ailments. Unknown id → 404 page.
  - `GET /ailments` — each ailment with its description and how many agents have it.
- Header navigation: Home, Agents, Ailments.
- Brand colors: **orange and black**.
- Responsive: tables scroll horizontally inside `.table-wrap` on narrow screens.

## Decisions

- Data access functions live in `src/db/` and return typed rows (`src/db/types.ts`); routes never write SQL.
- Routes are Hono sub-apps in `src/routes/` mounted from `src/app.tsx`.
- Component props are declared as named TypeScript types (e.g. `type AgentListProps = {...}`), not inline.
- Tests use an in-memory database (`:memory:`), migrated and seeded per test file, injected with `setDb()`.
- Agent status is one of `active`, `in-treatment`, `recovered`.

## Out of Scope

- Therapies, appointments, dashboard (later phases).
- Creating or editing agents through the UI.

## Context

See `specs/mission.md`, `specs/tech-stack.md`, and the Phase 1 spec `specs/2026-11-08-hello-hono/`.
