import { Hono } from 'hono'
import { Layout } from '../components/Layout.js'
import { AgentsList } from '../components/AgentsList.js'
import { AgentDetail } from '../components/AgentDetail.js'
import { getAgent, getAgentAilments, listAgents } from '../db/agents.js'
import { getRecommendedTherapies } from '../db/therapies.js'
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
  const param = c.req.param('id')
  const agent = /^\d+$/.test(param) ? getAgent(Number(param)) : undefined
  if (!agent) return c.html(<NotFound />, 404)

  const ailments = getAgentAilments(agent.id)
  const therapies = getRecommendedTherapies(ailments.map((a) => a.id))
  return c.html(
    <Layout title={agent.name}>
      <AgentDetail agent={agent} ailments={ailments} therapies={therapies} />
    </Layout>,
  )
})
