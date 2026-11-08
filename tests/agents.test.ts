import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app.js'
import { listAgents } from '../src/db/agents.js'
import { useTestDb } from './setup-db.js'

beforeAll(() => {
  useTestDb()
})

describe('GET /agents', () => {
  it('lists every agent with a link to its profile', async () => {
    const res = await app.request('/agents')
    expect(res.status).toBe(200)
    const html = await res.text()
    for (const agent of listAgents()) {
      expect(html).toContain(agent.name)
      expect(html).toContain(`href="/agents/${agent.id}"`)
    }
  })
})

describe('GET /agents/:id', () => {
  it('shows the agent profile and ailments', async () => {
    const agent = listAgents().find((a) => a.name === 'Clippy Jr.')!
    const res = await app.request(`/agents/${agent.id}`)
    expect(res.status).toBe(200)
    const html = await res.text()
    expect(html).toContain('<h1>Clippy Jr.</h1>')
    expect(html).toContain('GPT-4o')
    expect(html).toContain('in-treatment')
    expect(html).toContain('Prompt fatigue')
  })

  it.each(['999', 'abc'])('returns 404 for /agents/%s', async (id) => {
    const res = await app.request(`/agents/${id}`)
    expect(res.status).toBe(404)
    expect(await res.text()).toContain('Page not found')
  })
})

describe('GET /ailments', () => {
  it('lists every ailment', async () => {
    const res = await app.request('/ailments')
    expect(res.status).toBe(200)
    const html = await res.text()
    expect(html).toContain('Context-window claustrophobia')
    expect(html).toContain('Retry-loop burnout')
  })
})

describe('navigation', () => {
  it('header links to Home, Agents and Ailments', async () => {
    const html = await (await app.request('/')).text()
    expect(html).toContain('href="/agents"')
    expect(html).toContain('href="/ailments"')
  })
})
