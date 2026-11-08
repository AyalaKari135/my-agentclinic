import { Hono } from 'hono'
import { Layout } from '../components/Layout.js'
import { AgentsList } from '../components/AgentsList.js'
import { AgentDetail } from '../components/AgentDetail.js'
import { getAgent, getAgentAilments, listAgents } from '../db/agents.js'
import { NotFound } from '../pages/NotFound.js'

export const agentsRoute = new Hono()

agentsRoute.get('/', (c) =>
  c.html(
    <Layout title="Agents">
      <AgentsList agents={listAgents()} />
    </Layout>,
  ),
)

agentsRoute.get('/:id', (c) => {
  const id = Number(c.req.param('id'))
  const agent = Number.isInteger(id) ? getAgent(id) : undefined
  if (!agent) return c.html(<NotFound />, 404)

  return c.html(
    <Layout title={agent.name}>
      <AgentDetail agent={agent} ailments={getAgentAilments(agent.id)} />
    </Layout>,
  )
})
