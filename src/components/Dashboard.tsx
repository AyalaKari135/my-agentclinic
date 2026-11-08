import type { DashboardCounts } from '../db/dashboard.js'
import type { AppointmentWithAgent } from '../db/types.js'
import { formatDateTime } from '../format.js'

type DashboardProps = {
  counts: DashboardCounts
  appointments: AppointmentWithAgent[]
}

type StatusButtonProps = {
  appointmentId: number
  status: 'confirmed' | 'cancelled'
  label: string
}

function StatusButton({ appointmentId, status, label }: StatusButtonProps) {
  return (
    <form method="post" action={`/appointments/${appointmentId}/status`} class="inline-form">
      <input type="hidden" name="status" value={status} />
      <button type="submit" class="button button-small">
        {label}
      </button>
    </form>
  )
}

export function Dashboard({ counts, appointments }: DashboardProps) {
  return (
    <section>
      <h1>Staff dashboard</h1>
      <ul class="stats">
        <li class="stat">
          <span class="stat-value">{counts.agents}</span>
          <span class="stat-label">Agents</span>
        </li>
        <li class="stat">
          <span class="stat-value">{counts.openAppointments}</span>
          <span class="stat-label">Open appointments</span>
        </li>
        <li class="stat">
          <span class="stat-value">{counts.ailmentsInFlight}</span>
          <span class="stat-label">Ailments in flight</span>
        </li>
      </ul>

      <h2>Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet. Book one from an agent's page.</p>
      ) : (
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">When</th>
                <th scope="col">Agent</th>
                <th scope="col">Therapist</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr>
                  <td>
                    <time datetime={a.scheduled_at}>{formatDateTime(a.scheduled_at)}</time>
                  </td>
                  <td>
                    <a href={`/agents/${a.agent_id}`}>{a.agent_name}</a>
                  </td>
                  <td>{a.therapist}</td>
                  <td>{a.status}</td>
                  <td class="actions">
                    {a.status === 'pending' && <StatusButton appointmentId={a.id} status="confirmed" label="Confirm" />}
                    {a.status !== 'cancelled' && <StatusButton appointmentId={a.id} status="cancelled" label="Cancel" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
