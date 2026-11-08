import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { Home } from './pages/Home.js'
import { NotFound } from './pages/NotFound.js'
import { agentsRoute } from './routes/agents.js'
import { ailmentsRoute } from './routes/ailments.js'
import { therapiesRoute } from './routes/therapies.js'

export const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => c.html(<Home />))
app.route('/agents', agentsRoute)
app.route('/ailments', ailmentsRoute)
app.route('/therapies', therapiesRoute)

app.notFound((c) => c.html(<NotFound />, 404))
