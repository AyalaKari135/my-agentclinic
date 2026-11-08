import { NOTES_MAX, THERAPIST_MAX, type BookingErrors, type BookingValues } from '../validation.js'

type AppointmentFormProps = {
  agentId: number
  values?: BookingValues
  errors?: BookingErrors
}

const empty: BookingValues = { therapist: '', scheduledAt: '', notes: '' }

export function AppointmentForm({ agentId, values = empty, errors = {} }: AppointmentFormProps) {
  const hasErrors = Object.keys(errors).length > 0
  return (
    <section aria-labelledby="book-heading">
      <h2 id="book-heading">Book an appointment</h2>
      {hasErrors && (
        <p class="form-error-summary" role="alert">
          Please fix the errors below.
        </p>
      )}
      <form method="post" action={`/agents/${agentId}/appointments`} class="form" novalidate>
        <div class="field">
          <label for="therapist">Therapist</label>
          <input
            id="therapist"
            name="therapist"
            type="text"
            required
            maxlength={THERAPIST_MAX}
            value={values.therapist}
            aria-invalid={errors.therapist ? 'true' : undefined}
            aria-describedby={errors.therapist ? 'therapist-error' : undefined}
          />
          {errors.therapist && (
            <p id="therapist-error" class="field-error">
              {errors.therapist}
            </p>
          )}
        </div>
        <div class="field">
          <label for="scheduledAt">Date and time</label>
          <input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            required
            value={values.scheduledAt}
            aria-invalid={errors.scheduledAt ? 'true' : undefined}
            aria-describedby={errors.scheduledAt ? 'scheduledAt-error' : undefined}
          />
          {errors.scheduledAt && (
            <p id="scheduledAt-error" class="field-error">
              {errors.scheduledAt}
            </p>
          )}
        </div>
        <div class="field">
          <label for="notes">Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxlength={NOTES_MAX}
            aria-invalid={errors.notes ? 'true' : undefined}
            aria-describedby={errors.notes ? 'notes-error' : undefined}
          >
            {values.notes}
          </textarea>
          {errors.notes && (
            <p id="notes-error" class="field-error">
              {errors.notes}
            </p>
          )}
        </div>
        <button type="submit" class="button">
          Book appointment
        </button>
      </form>
    </section>
  )
}
