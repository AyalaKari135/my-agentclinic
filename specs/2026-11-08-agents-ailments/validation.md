# Validation — Phase 2: Agents & Ailments

Merge when all of these are true:

- [x] `npm run db:migrate && npm run db:seed` creates `data/agentclinic.db`; running the seed twice does not duplicate rows.
- [x] `GET /agents` returns 200 and lists all 6 seeded agents, each linking to `/agents/:id`.
- [x] `GET /agents/1` returns 200 with the agent's name, model, status and its ailments.
- [x] `GET /agents/999`, `GET /agents/abc` and non-integer ids like `1e0` return 404.
- [x] Unknown URLs render the branded 404 page.
- [x] `GET /ailments` returns 200 and lists all 6 ailments with agent counts.
- [x] Header shows Home, Agents and Ailments links.
- [x] Brand colors are orange and black.
- [x] Pages are usable at 360px width (tables scroll inside their container).
- [x] `npm run typecheck` and `npm test` pass.

## Review notes

Branch reviewed from three perspectives before merge:

- **Correctness / security** — agent id parsing accepted `1e0` and `%201`; now only digits are accepted. Static files cannot escape `static/` (`/static/../package.json` → 404). All SQL uses bound parameters.
- **Spec alignment** — unknown URLs fell back to Hono's plain-text 404; now use the branded `NotFound` page. All requirements above are covered by tests.
- **UX / accessibility** — status badges show text, not only color; orange-on-black and dark-orange-on-white meet WCAG AA contrast. Focus styles and `aria-current` are left for Phase 6.
