# Validation — Phase 1: Hello Hono

The phase can be merged when all of these are true:

- [x] `npm install` completes with no errors.
- [x] `npm run typecheck` exits with code 0.
- [x] `npm run dev` starts a server on http://localhost:3000.
- [x] `GET /` returns status 200 with `Content-Type: text/html`.
- [x] The response body contains "AgentClinic is open for business" inside an `<h1>` or `<p>` of a full HTML page with `<title>AgentClinic</title>`.
- [x] `Header`, `Main` and `Footer` are each in their own file under `src/components/`.
- [x] The page has `<header>`, `<main>` and `<footer>` elements and links `/static/style.css`.
- [x] `GET /static/style.css` returns 200 with `text/css`.
- [x] No leftover `src/index.ts`.

## Automated tests

These checks are covered by Vitest (`npm test`):

- `tests/app.test.ts` — `GET /` status, content type, message, layout landmarks; stylesheet served.
- `tests/components.test.tsx` — `Header`, `Main` and `Footer` render as expected.
