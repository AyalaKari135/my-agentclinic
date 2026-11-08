import { Hono } from 'hono'
import { Layout } from '../components/Layout.js'
import { AgentsList } from '../components/AgentsList.js'
import { AgentDetail } from '../components/AgentDetail.js'
import { AppointmentForm } from '../components/AppointmentForm.js'
import { getAgent, getAgentAilments, listAgents } from '../db/agents.js'
import { createAppointment } from '../db/appointments.js'
import { getRecommendedTherapies } from '../db/therapies.js'
import type { Agent } from '../db/types.js'
import { NotFound } from '../pages/NotFound.js'
import { validateBooking, type BookingErrors, type BookingValues } from '../validation.js'

export const agentsRoute = new Hono()

function findAgent(param: string): Agent | undefined {
  return /^\d+$/.test(param) ? getAgent(Number(param)) : undefined
}

type AgentPageProps = {
  agent: Agent
  values?: BookingValues
  errors?: BookingErrors
}

function AgentPage({ agent, values, errors }: AgentPageProps) {
  const ailments = getAgentAilments(agent.id)
  const therapies = getRecommendedTherapies(ailments.map((a) => a.id))
  return (
    <Layout title={agent.name} section="/agents">
      <AgentDetail agent={agent} ailments={ailments} therapies={therapies} />
      <AppointmentForm agentId={agent.id} values={values} errors={errors} />
    </Layout>
  )
}

agentsRoute.get('/', (c) =>
  c.html(
    <Layout title="Agents" section="/agents">
      <AgentsList agents={listAgents()} />
    </Layout>,
  ),
)

agentsRoute.get('/:id', (c) => {
  const agent = findAgent(c.req.param('id'))
  if (!agent) return c.html(<NotFound />, 404)
  return c.html(<AgentPage agent={agent} />)
})

agentsRoute.post('/:id/appointments', async (c) => {
  const agent = findAgent(c.req.param('id'))
  if (!agent) return c.html(<NotFound />, 404)

  const { values, errors } = validateBooking(await c.req.parseBody())
  if (Object.keys(errors).length > 0) {
    return c.html(<AgentPage agent={agent} values={values} errors={errors} />, 400)
  }

  const id = createAppointment({ agentId: agent.id, ...values })
  return c.redirect(`/appointments/${id}`, 303)
})
