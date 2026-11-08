import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { requestLogger } from './middleware/logger.js'
import { Home } from './pages/Home.js'
import { NotFound } from './pages/NotFound.js'
import { ServerError } from './pages/ServerError.js'
import { agentsRoute } from './routes/agents.js'
import { ailmentsRoute } from './routes/ailments.js'
import { therapiesRoute } from './routes/therapies.js'
import { appointmentsRoute } from './routes/appointments.js'
import { dashboardRoute } from './routes/dashboard.js'

export const app = new Hono()

app.use(requestLogger())
app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => c.html(<Home />))
app.route('/agents', agentsRoute)
app.route('/ailments', ailmentsRoute)
app.route('/therapies', therapiesRoute)
app.route('/appointments', appointmentsRoute)
app.route('/dashboard', dashboardRoute)

app.notFound((c) => c.html(<NotFound />, 404))

app.onError((err, c) => {
  if (!process.env.VITEST) console.error(err)
  return c.html(<ServerError />, 500)
})
