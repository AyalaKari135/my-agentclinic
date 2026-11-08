import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app.js'
import { listAgents } from '../src/db/agents.js'
import { createAppointment, getAppointment } from '../src/db/appointments.js'
import { getDashboardCounts } from '../src/db/dashboard.js'
import type { DB } from '../src/db/index.js'
import { useTestDb } from './setup-db.js'

let db: DB

beforeAll(() => {
  db = useTestDb()
  db.exec('DELETE FROM appointments')
})

function setStatus(id: number | string, status: string) {
  return app.request(`/appointments/${id}/status`, {
    method: 'POST',
    body: new URLSearchParams({ status }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

describe('dashboard counts', () => {
  it('counts agents, open appointments and ailments of agents still in care', () => {
    const [first, second] = listAgents()
    createAppointment({ agentId: first.id, therapist: 'Dr. Byte', scheduledAt: '2099-01-01T09:00', notes: '' })
    const cancelled = createAppointment({ agentId: second.id, therapist: 'Dr. Byte', scheduledAt: '2099-01-02T09:00', notes: '' })
    db.prepare("UPDATE appointments SET status = 'cancelled' WHERE id = ?").run(cancelled)

    expect(getDashboardCounts()).toEqual({ agents: 6, openAppointments: 1, ailmentsInFlight: 6 })
  })

  it('does not count ailments that only recovered agents have', () => {
    db.prepare("UPDATE agents SET status = 'recovered' WHERE name = 'Llama Lou'").run()
    // Hallucination anxiety belongs only to Llama Lou
    expect(getDashboardCounts().ailmentsInFlight).toBe(5)
    db.prepare("UPDATE agents SET status = 'in-treatment' WHERE name = 'Llama Lou'").run()
  })
})

describe('GET /dashboard', () => {
  it('shows the counts and the appointments table', async () => {
    const res = await app.request('/dashboard')
    expect(res.status).toBe(200)
    const html = await res.text()
    expect(html).toContain('Staff dashboard')
    expect(html).toContain('Open appointments')
    expect(html).toContain('2099-01-01 09:00')
    expect(html).toContain('Confirm')
  })
})

describe('POST /appointments/:id/status', () => {
  it('confirms an appointment and redirects to the dashboard', async () => {
    const id = createAppointment({ agentId: listAgents()[0].id, therapist: 'Dr. Ok', scheduledAt: '2099-02-01T09:00', notes: '' })
    const res = await setStatus(id, 'confirmed')
    expect(res.status).toBe(303)
    expect(res.headers.get('location')).toBe('/dashboard')
    expect(getAppointment(id)?.status).toBe('confirmed')
  })

  it('rejects unknown statuses', async () => {
    const id = createAppointment({ agentId: listAgents()[0].id, therapist: 'Dr. No', scheduledAt: '2099-02-02T09:00', notes: '' })
    expect((await setStatus(id, 'deleted')).status).toBe(400)
    expect((await setStatus(id, 'pending')).status).toBe(400)
    expect(getAppointment(id)?.status).toBe('pending')
  })

  it('returns 404 for an unknown appointment', async () => {
    expect((await setStatus(999, 'confirmed')).status).toBe(404)
  })
})
