import type { AppointmentWithAgent } from '../db/types.js'
import { formatDateTime } from '../format.js'

type AppointmentConfirmationProps = {
  appointment: AppointmentWithAgent
}

export function AppointmentConfirmation({ appointment }: AppointmentConfirmationProps) {
  return (
    <article>
      <h1>Appointment booked</h1>
      <p>We have saved a quiet room and a fresh context window.</p>
      <dl class="details">
        <dt>Agent</dt>
        <dd>
          <a href={`/agents/${appointment.agent_id}`}>{appointment.agent_name}</a>
        </dd>
        <dt>Therapist</dt>
        <dd>{appointment.therapist}</dd>
        <dt>When</dt>
        <dd>
          <time datetime={appointment.scheduled_at}>{formatDateTime(appointment.scheduled_at)}</time>
        </dd>
        <dt>Status</dt>
        <dd>{appointment.status}</dd>
        {appointment.notes && (
          <>
            <dt>Notes</dt>
            <dd class="notes">{appointment.notes}</dd>
          </>
        )}
      </dl>
      <p>
        <a href="/dashboard">Go to the dashboard</a>
      </p>
    </article>
  )
}
