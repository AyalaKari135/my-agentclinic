# Tech Stack

AgentClinic is a server-side TypeScript application. HTML is rendered on the server and sent to the browser ready to display.

## Core

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript | Type safety end to end (Mary's requirement) |
| Runtime | Node.js (v18+) | Stable and widely used |
| Web framework | **Hono** | Small, TypeScript-first, built-in server-side JSX |
| Templates | Hono JSX | Components are plain functions; no React needed |
| Styling | Plain CSS with custom properties | No build step; modern look for Steve |

## Why Hono (recommended framework)

- Written in TypeScript, types work with zero configuration.
- Ships a JSX renderer, so pages are typed components rendered on the server.
- Simple routing and middleware.
- Lighter than Express and has a more modern API.

## Data

- **SQLite** (via `better-sqlite3`) — an embedded, file-based database; no server to install.
- Schema changes as plain SQL migration files; seed data as a TypeScript script.

## Testing

- **Vitest** is used for validation: every feature's `validation.md` lists checks that are backed by automated tests.
- Tests live in `tests/` and call the Hono app in-process with `app.request()` — no running server needed.
- Run with `npm test` (`vitest run`); `npm run test:watch` for watch mode.

## Tooling

- `tsx` to run TypeScript directly in development (`npm run dev`).
- `tsc` for type checking and production builds.

## Not Using (for now)

- No client-side framework (React/Vue/Svelte).
- No ORM.
- No Docker.
