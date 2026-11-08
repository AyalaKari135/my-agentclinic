import { Hono } from 'hono'
import { Layout } from '../components/Layout.js'
import { Dashboard } from '../components/Dashboard.js'
import { listAppointments } from '../db/appointments.js'
import { getDashboardCounts } from '../db/dashboard.js'

export const dashboardRoute = new Hono()

dashboardRoute.get('/', (c) =>
  c.html(
    <Layout title="Dashboard" section="/dashboard">
      <Dashboard counts={getDashboardCounts()} appointments={listAppointments()} />
    </Layout>,
  ),
)
