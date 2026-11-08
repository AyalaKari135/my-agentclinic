# Validation — Phase 2: Agents & Ailments

Merge when all of these are true:

- [ ] `npm run db:migrate && npm run db:seed` creates `data/agentclinic.db`; running the seed twice does not duplicate rows.
- [ ] `GET /agents` returns 200 and lists all 6 seeded agents, each linking to `/agents/:id`.
- [ ] `GET /agents/1` returns 200 with the agent's name, model, status and its ailments.
- [ ] `GET /agents/999` and `GET /agents/abc` return 404.
- [ ] `GET /ailments` returns 200 and lists all 6 ailments with agent counts.
- [ ] Header shows Home, Agents and Ailments links.
- [ ] Brand colors are orange and black.
- [ ] Pages are usable at 360px width (tables scroll inside their container).
- [ ] `npm run typecheck` and `npm test` pass.
