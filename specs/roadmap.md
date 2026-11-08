# Roadmap

Each phase is a focused, shippable slice of work that can be reviewed and validated on its own.

---

## Phase 1 — Hello Hono ✅
- Install Hono and the `tsx` dev server
- `/` route that answers "AgentClinic is open for business"
- TypeScript type check passes

## Phase 2 — Agents & Ailments
- Shared JSX layout (header, main, footer) and basic CSS — all pages render inside the layout (started in Phase 1)
- Responsive: every new page is checked on mobile and desktop widths
- SQLite database with SQL migrations; `agents` table and seed data
- `/agents` page listing all agents
- `/agents/:id` page: name, model, status, ailments
- `ailments` table + seed data, linked to agents (many-to-many)
- `/ailments` page

## Phase 3 — Therapies Catalog
- `therapies` table + seed data
- Recommended therapies for each ailment
- `/therapies` page

## Phase 4 — Appointment Booking
- `appointments` table (agent, therapist, date-time, status)
- Booking form on the agent detail page
- Validation and a confirmation page

## Phase 5 — Staff Dashboard
- `/dashboard` with counts (agents, open appointments, active ailments)
- Tables of recent appointments

## Phase 6 — Polish & Accessibility
- Semantic HTML, keyboard navigation, visible focus styles

## Phase 7 — Hardening
- 404 and 500 pages
- Input sanitization on forms
- Request logging middleware

---

Later (not planned yet): authentication, email notifications, therapist profiles, reports.
