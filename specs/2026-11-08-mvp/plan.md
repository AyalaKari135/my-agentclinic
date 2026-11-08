# Plan — MVP

## 1. Therapies (Phase 3)
1.1 Migrations `004_create_therapies.sql`, `005_create_ailment_therapies.sql`.
1.2 Seed 6 therapies and ailment → therapy links.
1.3 `src/db/therapies.ts`: `listTherapiesWithAilments()`, `getRecommendedTherapies(ailmentIds)`.
1.4 `TherapiesList` component, `GET /therapies`, nav link.
1.5 Show recommended therapies on `/ailments` and `/agents/:id`.

## 2. Appointments (Phase 4)
2.1 Migration `006_create_appointments.sql`.
2.2 `src/db/appointments.ts`: create, get, list, update status.
2.3 `src/validation.ts`: sanitize + validate booking input.
2.4 `AppointmentForm` on the agent page; `POST /agents/:id/appointments`.
2.5 `AppointmentConfirmation` page at `GET /appointments/:id`.

## 3. Dashboard (Phase 5)
3.1 `src/db/dashboard.ts`: summary counts.
3.2 `Dashboard` component with stat cards and appointments table.
3.3 `GET /dashboard`, `POST /appointments/:id/status`, nav link.

## 4. Polish & accessibility (Phase 6)
4.1 Skip link, `aria-current` in nav (Layout receives the current path).
4.2 Focus styles, form styles, stat cards — responsive.

## 5. Hardening (Phase 7)
5.1 `ServerError` page + `app.onError`.
5.2 Logger middleware.

## 6. Tests and docs
6.1 Tests for every new route, validation and the dashboard counts.
6.2 README with how to run; roadmap marked complete; changelog.
