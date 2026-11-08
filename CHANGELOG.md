# Changelog

## 2026-11-08
- MVP (Phases 3-7) complete:
  - Therapies catalog with recommended therapies on ailment and agent pages
  - Appointment booking from the agent page, with server-side validation and a confirmation page
  - Staff dashboard with counts and confirm/cancel actions
  - Skip link, current-page navigation, visible focus styles
  - 500 error page and request logging
- Documented open questions found while building the MVP in the MVP spec
- Phase 2 — Agents & Ailments: SQLite database with migrations and seed data; `/agents`, `/agents/:id` and `/ailments` pages
- Orange and black brand colors; header navigation for Agents and Ailments
- Branded 404 page for unknown URLs and invalid agent ids
- Component props use named TypeScript types
- Roadmap replanned: phases 2-5 combined into Phase 2
- Added a `changelog` agent skill that drafts this file from git history
- Adopted responsive (mobile-first) design in the specs and the layout CSS
- Added Vitest with `npm test`, and tests for the home page, stylesheet and layout components
- Phase 1 — Hello Hono: Hono server, home page, shared layout (header, main, footer) and stylesheet
- Wrote the Phase 1 feature spec (plan, requirements, validation)
- Created the project constitution: mission (with target audience), tech stack (Hono, SQLite), roadmap
- Started from a TypeScript project scaffold
