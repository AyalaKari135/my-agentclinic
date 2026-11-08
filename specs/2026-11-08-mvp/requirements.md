# Requirements — MVP (Phases 3–7)

## Scope

Finish every remaining roadmap phase so AgentClinic is a complete, demo-ready app: therapies, appointment booking, a staff dashboard, accessibility polish and basic hardening. Phases 1 and 2 are merged.

## Phases Included

### Phase 3 — Therapies Catalog
- `therapies` table (name, description, duration in minutes) + 6 seeded therapies.
- Join table `ailment_therapies` (many-to-many): each ailment has recommended therapies.
- `GET /therapies` lists therapies and the ailments each one treats.
- `/ailments` shows the recommended therapies for each ailment; the agent page shows recommended therapies for its ailments.

### Phase 4 — Appointment Booking
- `appointments` table: `agent_id`, `therapist` (text), `scheduled_at` (`YYYY-MM-DDTHH:MM`), `status` (`pending` | `confirmed` | `cancelled`), `notes`, `created_at`.
- Booking form on `/agents/:id`: therapist (required), date-time (required, in the future), notes (optional).
- `POST /agents/:id/appointments` validates on the server. Invalid input re-renders the agent page with error messages and the values entered, status 400.
- Success redirects (303) to `GET /appointments/:id`, a confirmation page.

### Phase 5 — Staff Dashboard
- `GET /dashboard` with three counts: total agents, open appointments (`pending` + `confirmed`), ailments in flight (distinct ailments of agents not `recovered`).
- Table of all appointments, soonest first, with buttons to **confirm** or **cancel** open ones (`POST /appointments/:id/status`).

### Phase 6 — Polish & Accessibility
- "Skip to content" link; current page marked with `aria-current="page"` in the nav.
- Visible `:focus-visible` outline on all links, buttons and inputs.
- Every form field has a `<label>`; errors are linked with `aria-describedby`.
- Responsive check of every new page at 360px.

### Phase 7 — Hardening
- Branded 404 (done in Phase 2) and 500 pages (`app.onError`).
- Input sanitization: trim, remove control characters, enforce max lengths (therapist 80, notes 500). Output is escaped by Hono JSX.
- Logging middleware: `METHOD path status durationms` for each request (silent during tests).

## Decisions

- Same patterns as Phase 2: SQL migrations, idempotent seed, data functions in `src/db/`, Hono routers in `src/routes/`, typed props.
- Therapist is free text for the MVP — no `therapists` table.
- No client-side JavaScript; forms use plain HTML POST.
- No new runtime dependencies.
- All MVP work happens on the `mvp` branch, one commit per phase.

## Out of Scope

- Authentication (the dashboard is open — acceptable for a demo app).
- Editing or deleting agents, therapies or ailments.
- Email notifications, therapist profiles, reports.

## Clarifications found while building the MVP

Questions the specs did not answer, with the choice made for now:

1. **Time zone of appointments** — `scheduled_at` is stored as local time without a zone (`YYYY-MM-DDTHH:MM`), and "in the future" is checked against the server clock. Fine for a single-clinic demo; needs a decision before multiple time zones.
2. **What counts as an "open" appointment** — `pending` + `confirmed`, including ones whose time has already passed. A later phase could add a `completed` status.
3. **Agent status vs. appointments** — booking does not change an agent's status (e.g. to `in-treatment`). Status is seed data only; staff cannot edit it yet.
4. **Therapist** — free text, so the same therapist can be typed two ways ("Dr. Byte" / "dr byte"). A `therapists` table (already in "later phases") would fix this.
5. **Dashboard access** — anyone can open `/dashboard` and change appointment statuses. Acceptable for a demo; authentication is listed under later phases.
6. **Seed appointments** use fixed dates in January 2027; after that date they will appear in the past.

## Context

`specs/mission.md`, `specs/tech-stack.md`, `specs/2026-11-08-agents-ailments/`.
