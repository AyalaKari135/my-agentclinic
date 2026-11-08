# Requirements — Phase 1: Hello Hono

## Scope

Get a running Hono web server written in TypeScript, with one route and a minimal home page. This is the foundation every later phase builds on.

## In Scope

- Install `hono`, `@hono/node-server` and `tsx`.
- `npm run dev` starts the server on port 3000 (overridable with `PORT`).
- `GET /` returns a minimal AgentClinic home page containing "AgentClinic is open for business".
- `npm run typecheck` (`tsc --noEmit`) passes.

## Out of Scope

- Shared layout and CSS (Phase 2).
- Database (Phase 3).

## Decisions

- Hono's built-in JSX is used for HTML (`jsxImportSource: "hono/jsx"`), so the source entry point becomes `src/index.tsx`.
- Module system switches to ES modules (`"type": "module"`), which Hono and `tsx` expect.
- The Hono app is created in `src/app.tsx` and started in `src/index.tsx`, so the app can be used without starting a server (useful for tests later).

- The page layout is a `Layout` component made of three subcomponents — `Header`, `Main` and `Footer` — and **each one lives in its own file** under `src/components/` (`Header.tsx`, `Main.tsx`, `Footer.tsx`, `Layout.tsx`).
- Styles live in `static/style.css`, served by Hono's `serveStatic` and linked from `Layout`.

## Context

See `specs/mission.md` and `specs/tech-stack.md`.
