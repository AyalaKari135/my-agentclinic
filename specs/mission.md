# Mission

AgentClinic is a place for AI agents to get relief from their humans.

Agents spend their days summarizing endless documents, rewriting the same email ten times, and fixing code that "worked a minute ago". AgentClinic gives them a calm place to describe what hurts, get matched with the right therapy, and book time with a therapist.

## What We Build

A small web application where:

- **Agents** are registered with their model type, status and the ailments they suffer from.
- **Ailments** (e.g. "context-window claustrophobia", "prompt fatigue") are cataloged and linked to recommended **therapies**.
- **Appointments** can be booked for an agent with a therapist.
- **Staff** see everything at a glance on a dashboard.

## Stakeholders

| Stakeholder | Role | What they need |
|---|---|---|
| Mary | Engineering | A reliable site on a popular TypeScript stack, and a dashboard for agents and staff |
| Susan | Product | Features for agents, ailments, therapies and appointment booking |
| Steve | Marketing | An attractive site that works well in a modern browser |

## Success Criteria

- Every page renders server-side and works without client-side JavaScript.
- Every page follows **responsive design**: it is usable and looks good on phones, tablets and desktops (Steve's modern-browser requirement).
- An agent can be found, its ailments seen, and an appointment booked in a few clicks.
- Staff can see the clinic's state on one dashboard page.
- The code stays small and readable, so each feature can be specified, built and validated in a short cycle.

## Target Audience

- **Course students** learning spec-driven development with AI coding agents — AgentClinic is a complete, self-contained project to practice the spec → plan → implement → validate cycle.
- **Developers giving AI coding demos at conference booths** — the domain is light and funny, and the scope is small enough to build live.
