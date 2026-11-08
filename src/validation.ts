export const THERAPIST_MAX = 80
export const NOTES_MAX = 500

export type BookingValues = {
  therapist: string
  scheduledAt: string
  notes: string
}

export type BookingErrors = Partial<Record<keyof BookingValues, string>>

/** Trim and remove control characters (newlines are kept only when allowed). */
export function sanitize(value: unknown, { multiline = false } = {}): string {
  if (typeof value !== 'string') return ''
  const pattern = multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g
  return value.replace(/\r\n?/g, '\n').replace(pattern, '').trim()
}

const DATETIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/

/** Parse a `YYYY-MM-DDTHH:MM` local date-time, rejecting impossible dates like Feb 31. */
export function parseLocalDateTime(value: string): Date | undefined {
  const m = DATETIME.exec(value)
  if (!m) return undefined
  const [year, month, day, hour, minute] = m.slice(1).map(Number)
  const date = new Date(year, month - 1, day, hour, minute)
  const roundTrips =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getHours() === hour &&
    date.getMinutes() === minute
  return roundTrips ? date : undefined
}

export function validateBooking(
  input: Record<string, unknown>,
  now = new Date(),
): { values: BookingValues; errors: BookingErrors } {
  const values: BookingValues = {
    therapist: sanitize(input.therapist),
    scheduledAt: sanitize(input.scheduledAt),
    notes: sanitize(input.notes, { multiline: true }),
  }
  const errors: BookingErrors = {}

  if (!values.therapist) errors.therapist = 'Please enter a therapist.'
  else if (values.therapist.length > THERAPIST_MAX)
    errors.therapist = `Therapist name must be at most ${THERAPIST_MAX} characters.`

  const date = parseLocalDateTime(values.scheduledAt)
  if (!values.scheduledAt) errors.scheduledAt = 'Please choose a date and time.'
  else if (!date) errors.scheduledAt = 'Please enter a valid date and time.'
  else if (date <= now) errors.scheduledAt = 'The appointment must be in the future.'

  if (values.notes.length > NOTES_MAX) errors.notes = `Notes must be at most ${NOTES_MAX} characters.`

  return { values, errors }
}
