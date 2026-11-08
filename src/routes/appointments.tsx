import { Hono } from 'hono'
import { Layout } from '../components/Layout.js'
import { AppointmentConfirmation } from '../components/AppointmentConfirmation.js'
import { getAppointment, updateAppointmentStatus } from '../db/appointments.js'
import type { AppointmentStatus } from '../db/types.js'
import { NotFound } from '../pages/NotFound.js'

export const appointmentsRoute = new Hono()

const staffStatuses: AppointmentStatus[] = ['confirmed', 'cancelled']

appointmentsRoute.get('/:id{[0-9]+}', (c) => {
  const appointment = getAppointment(Number(c.req.param('id')))
  if (!appointment) return c.html(<NotFound />, 404)

  return c.html(
    <Layout title="Appointment booked">
      <AppointmentConfirmation appointment={appointment} />
    </Layout>,
  )
})

appointmentsRoute.post('/:id{[0-9]+}/status', async (c) => {
  const { status } = await c.req.parseBody()
  if (typeof status !== 'string' || !staffStatuses.includes(status as AppointmentStatus)) {
    return c.text('Invalid status', 400)
  }
  if (!updateAppointmentStatus(Number(c.req.param('id')), status as AppointmentStatus)) {
    return c.html(<NotFound />, 404)
  }
  return c.redirect('/dashboard', 303)
})
