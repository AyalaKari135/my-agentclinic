# Plan — Phase 2: Agents & Ailments

## 1. Database foundation
1.1 Install `better-sqlite3` and `@types/better-sqlite3`.
1.2 `src/db/index.ts`: open the database (`DB_PATH` env, default `data/agentclinic.db`), `getDb()` / `setDb()`.
1.3 `src/db/migrate.ts`: apply `migrations/*.sql` in name order, tracking them in `schema_migrations`.
1.4 Migrations `001_create_agents.sql`, `002_create_ailments.sql`, `003_create_agent_ailments.sql`.
1.5 `src/db/seed.ts` (idempotent) and `npm run db:migrate`, `npm run db:seed` scripts.

## 2. Data access
2.1 `src/db/types.ts`: `Agent`, `Ailment`, `AilmentWithCount` types.
2.2 `src/db/agents.ts`: `listAgents()`, `getAgent(id)`, `getAgentAilments(id)`.
2.3 `src/db/ailments.ts`: `listAilmentsWithCounts()`.

## 3. Agents pages
3.1 `AgentsList` component and `GET /agents`.
3.2 `AgentDetail` component and `GET /agents/:id` (404 when not found).

## 4. Ailments page
4.1 `AilmentsList` component and `GET /ailments`.

## 5. Layout & style
5.1 Header navigation: Home, Agents, Ailments.
5.2 Orange-and-black brand colors, table styles, status badges.
5.3 Responsive tables (`.table-wrap`).

## 6. Tests
6.1 DB tests: migrations create tables, seed is idempotent, query functions.
6.2 Route tests for `/agents`, `/agents/:id` (found and 404), `/ailments`.
