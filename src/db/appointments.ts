import { getDb } from './index.js'
import type { AppointmentStatus, AppointmentWithAgent } from './types.js'

export type NewAppointment = {
  agentId: number
  therapist: string
  scheduledAt: string
  notes: string
}

export function createAppointment({ agentId, therapist, scheduledAt, notes }: NewAppointment): number {
  const result = getDb()
    .prepare('INSERT INTO appointments (agent_id, therapist, scheduled_at, notes) VALUES (?, ?, ?, ?)')
    .run(agentId, therapist, scheduledAt, notes)
  return Number(result.lastInsertRowid)
}

const selectWithAgent = `
  SELECT ap.*, ag.name AS agent_name FROM appointments ap
  JOIN agents ag ON ag.id = ap.agent_id`

export function getAppointment(id: number): AppointmentWithAgent | undefined {
  return getDb().prepare(`${selectWithAgent} WHERE ap.id = ?`).get(id) as AppointmentWithAgent | undefined
}

/** All appointments, soonest first. */
export function listAppointments(): AppointmentWithAgent[] {
  return getDb().prepare(`${selectWithAgent} ORDER BY ap.scheduled_at, ap.id`).all() as AppointmentWithAgent[]
}

/** Returns false when no appointment has this id. */
export function updateAppointmentStatus(id: number, status: AppointmentStatus): boolean {
  return getDb().prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id).changes > 0
}
