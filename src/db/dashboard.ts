import { getDb } from './index.js'

export type DashboardCounts = {
  agents: number
  openAppointments: number
  ailmentsInFlight: number
}

export function getDashboardCounts(): DashboardCounts {
  return getDb()
    .prepare(
      `SELECT
         (SELECT COUNT(*) FROM agents) AS agents,
         (SELECT COUNT(*) FROM appointments WHERE status IN ('pending', 'confirmed')) AS openAppointments,
         (SELECT COUNT(DISTINCT ai.ailment_id) FROM agent_ailments ai
            JOIN agents a ON a.id = ai.agent_id WHERE a.status <> 'recovered') AS ailmentsInFlight`,
    )
    .get() as DashboardCounts
}
