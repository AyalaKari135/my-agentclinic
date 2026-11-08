# Plan — Phase 1: Hello Hono

## 1. Project setup
1.1 Install `hono` and `@hono/node-server` as dependencies.
1.2 Install `tsx` and `@types/node` as dev dependencies.
1.3 Set `"type": "module"` and add scripts: `dev`, `start`, `build`, `typecheck`.
1.4 Update `tsconfig.json` for ES modules and Hono JSX.

## 2. Hello route
2.1 Create `src/app.tsx` exporting a Hono app.
2.2 Add `GET /` returning "AgentClinic is open for business".
2.3 Create `src/index.tsx` that serves the app with `@hono/node-server`.
2.4 Delete the old `src/index.ts`.

## 3. Minimal home page
3.1 Create `src/pages/Home.tsx`, a JSX component with a full HTML document: title "AgentClinic", an `<h1>`, and the "open for business" message.
3.2 `GET /` renders `Home`.

## 4. Main layout
4.1 Create a `Layout` component that renders the full HTML document (doctype, head, body).
4.2 `Layout` is built from three subcomponents: `Header`, `Main`, `Footer`.
4.3 Create `static/style.css`, serve `/static/*` with Hono's `serveStatic`, and link it from `Layout`.
4.4 `Home` renders inside `Layout`.

## 5. Verify
5.1 Run `npm run typecheck`.
5.2 Run `npm run dev` and open http://localhost:3000.
