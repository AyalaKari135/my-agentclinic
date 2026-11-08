import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app.js'
import { listAgents } from '../src/db/agents.js'
import { getAppointment } from '../src/db/appointments.js'
import { parseLocalDateTime, sanitize, validateBooking } from '../src/validation.js'
import { useTestDb } from './setup-db.js'

beforeAll(() => {
  useTestDb()
})

const future = '2099-01-15T10:30'

function book(agentId: number | string, fields: Record<string, string>) {
  return app.request(`/agents/${agentId}/appointments`, {
    method: 'POST',
    body: new URLSearchParams(fields),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

describe('validation', () => {
  it('sanitizes text', () => {
    expect(sanitize('  Dr. Byte\u0000\u0007  ')).toBe('Dr. Byte')
    expect(sanitize('line 1\r\nline 2', { multiline: true })).toBe('line 1\nline 2')
    expect(sanitize('line 1\nline 2')).toBe('line 1line 2')
    expect(sanitize(undefined)).toBe('')
  })

  it('rejects impossible dates', () => {
    expect(parseLocalDateTime('2099-02-31T10:00')).toBeUndefined()
    expect(parseLocalDateTime('2099-01-15 10:00')).toBeUndefined()
    expect(parseLocalDateTime(future)).toBeInstanceOf(Date)
  })

  it('reports each invalid field', () => {
    const now = new Date(2026, 0, 1)
    expect(validateBooking({}, now).errors).toEqual({
      therapist: expect.any(String),
      scheduledAt: expect.any(String),
    })
    expect(validateBooking({ therapist: 'x', scheduledAt: '2025-01-01T10:00' }, now).errors.scheduledAt).toMatch(
      /future/,
    )
    expect(validateBooking({ therapist: 'x'.repeat(81), scheduledAt: future }, now).errors.therapist).toBeDefined()
    expect(validateBooking({ therapist: 'x', scheduledAt: future, notes: 'n'.repeat(501) }, now).errors.notes).toBeDefined()
    expect(validateBooking({ therapist: 'x', scheduledAt: future }, now).errors).toEqual({})
  })
})

describe('booking an appointment', () => {
  it('shows the booking form on the agent page', async () => {
    const agent = listAgents()[0]
    const html = await (await app.request(`/agents/${agent.id}`)).text()
    expect(html).toContain(`action="/agents/${agent.id}/appointments"`)
    expect(html).toContain('<label for="therapist">')
  })

  it('redirects to a confirmation page on success', async () => {
    const agent = listAgents()[0]
    const res = await book(agent.id, { therapist: 'Dr. Byte', scheduledAt: future, notes: 'Bring logs' })
    expect(res.status).toBe(303)
    const location = res.headers.get('location')!
    expect(location).toMatch(/^\/appointments\/\d+$/)

    const saved = getAppointment(Number(location.split('/').pop()))
    expect(saved).toMatchObject({ agent_id: agent.id, therapist: 'Dr. Byte', scheduled_at: future, status: 'pending' })

    const html = await (await app.request(location)).text()
    expect(html).toContain('Appointment booked')
    expect(html).toContain(agent.name)
    expect(html).toContain('2099-01-15 10:30')
  })

  it('returns 400 with errors and keeps the entered values', async () => {
    const agent = listAgents()[0]
    const res = await book(agent.id, { therapist: 'Dr. Byte', scheduledAt: '2000-01-01T10:00' })
    expect(res.status).toBe(400)
    const html = await res.text()
    expect(html).toContain('must be in the future')
    expect(html).toContain('value="Dr. Byte"')
    expect(html).toContain('aria-describedby="scheduledAt-error"')
  })

  it('returns 404 for an unknown agent', async () => {
    expect((await book(999, { therapist: 'Dr. Byte', scheduledAt: future })).status).toBe(404)
  })

  it('escapes script tags typed into the form', async () => {
    const agent = listAgents()[0]
    const res = await book(agent.id, { therapist: '<script>alert(1)</script>', scheduledAt: future })
    const html = await (await app.request(res.headers.get('location')!)).text()
    expect(html).not.toContain('<script>alert(1)</script>')
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
  })

  it('returns 404 for an unknown appointment', async () => {
    expect((await app.request('/appointments/999')).status).toBe(404)
    expect((await app.request('/appointments/abc')).status).toBe(404)
  })
})
