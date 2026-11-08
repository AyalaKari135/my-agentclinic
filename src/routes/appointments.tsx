import { Hono } from 'hono'
import { Layout } from '../components/Layout.js'
import { AppointmentConfirmation } from '../components/AppointmentConfirmation.js'
import { getAppointment } from '../db/appointments.js'
import { NotFound } from '../pages/NotFound.js'

export const appointmentsRoute = new Hono()

appointmentsRoute.get('/:id{[0-9]+}', (c) => {
  const appointment = getAppointment(Number(c.req.param('id')))
  if (!appointment) return c.html(<NotFound />, 404)

  return c.html(
    <Layout title="Appointment booked">
      <AppointmentConfirmation appointment={appointment} />
    </Layout>,
  )
})
