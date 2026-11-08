# Validation — MVP

- [x] `GET /therapies` lists 6 therapies with the ailments they treat.
- [x] `/ailments` and `/agents/:id` show recommended therapies.
- [x] Booking with valid data redirects (303) to a confirmation page showing agent, therapist and time; the appointment is `pending`.
- [x] Booking with missing therapist, missing/invalid/past date, or too-long notes returns 400 and shows the errors next to the fields, keeping entered values.
- [x] Booking for an unknown agent returns 404.
- [x] `GET /dashboard` shows correct counts and lists appointments; confirm/cancel changes status and redirects back.
- [x] Invalid status values are rejected (400).
- [x] Every page has a skip link, `aria-current="page"` on the active nav item, and visible focus styles.
- [x] A thrown error renders the 500 page; unknown URLs render the 404 page.
- [x] Each request is logged as `METHOD path status durationms`.
- [x] Script tags typed into the form are shown as text, not executed.
- [x] `npm run typecheck` and `npm test` pass.

## How it was validated

- `npm test` — 66 Vitest tests across `tests/` (db, agents, therapies, appointments, dashboard, accessibility, hardening).
- `npm run typecheck` — no errors.
- Manual end-to-end run on a fresh database: every page returns 200, unknown URL 404, valid booking 303 → confirmation, invalid booking 400, confirm 303 → dashboard; the server log shows one line per request.
