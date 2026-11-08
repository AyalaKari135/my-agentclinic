# Roadmap

Each phase is a very small, shippable slice of work that can be reviewed and validated on its own.

---

## Phase 1 — Hello Hono ✅
- Install Hono and the `tsx` dev server
- `/` route that answers "AgentClinic is open for business"
- TypeScript type check passes

## Phase 2 — Base Layout
- Shared JSX layout (header, main, footer)
- Basic CSS (reset, colors, typography)
- All pages render inside the layout
- Responsive: every new page is checked on mobile and desktop widths

## Phase 3 — Agents List
- Database with an `agents` table and seed data
- `/agents` page listing all agents

## Phase 4 — Agent Detail
- `/agents/:id` page: name, model, status, ailments

## Phase 5 — Ailments Catalog
- `ailments` table + seed data, linked to agents
- `/ailments` page

## Phase 6 — Therapies Catalog
- `therapies` table + seed data
- Recommended therapies for each ailment
- `/therapies` page

## Phase 7 — Appointment Booking
- `appointments` table (agent, therapist, date-time, status)
- Booking form on the agent detail page
- Validation and a confirmation page

## Phase 8 — Staff Dashboard
- `/dashboard` with counts (agents, open appointments, active ailments)
- Tables of recent appointments

## Phase 9 — Polish & Accessibility
- Semantic HTML, keyboard navigation, visible focus styles

## Phase 10 — Hardening
- 404 and 500 pages
- Input sanitization on forms
- Request logging middleware

---

Later (not planned yet): authentication, email notifications, therapist profiles, reports.
