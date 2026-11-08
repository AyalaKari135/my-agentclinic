# Validation — MVP

- [ ] `GET /therapies` lists 6 therapies with the ailments they treat.
- [ ] `/ailments` and `/agents/:id` show recommended therapies.
- [ ] Booking with valid data redirects (303) to a confirmation page showing agent, therapist and time; the appointment is `pending`.
- [ ] Booking with missing therapist, missing/invalid/past date, or too-long notes returns 400 and shows the errors next to the fields, keeping entered values.
- [ ] Booking for an unknown agent returns 404.
- [ ] `GET /dashboard` shows correct counts and lists appointments; confirm/cancel changes status and redirects back.
- [ ] Invalid status values are rejected (400).
- [ ] Every page has a skip link, `aria-current="page"` on the active nav item, and visible focus styles.
- [ ] A thrown error renders the 500 page; unknown URLs render the 404 page.
- [ ] Each request is logged as `METHOD path status durationms`.
- [ ] Script tags typed into the form are shown as text, not executed.
- [ ] `npm run typecheck` and `npm test` pass.
