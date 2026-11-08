import { serve } from '@hono/node-server'
import { app } from './app.js'
import { getDb } from './db/index.js'
import { migrate } from './db/migrate.js'

const applied = migrate(getDb())
if (applied.length) console.log(`Applied migrations: ${applied.join(', ')}`)

const port = Number(process.env.PORT ?? 3000)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic running at http://localhost:${info.port}`)
})
