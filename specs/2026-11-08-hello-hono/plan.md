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

## 4. Verify
4.1 Run `npm run typecheck`.
4.2 Run `npm run dev` and open http://localhost:3000.
