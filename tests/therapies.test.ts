import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app.js'
import { listAgents } from '../src/db/agents.js'
import { listTherapiesWithAilments } from '../src/db/therapies.js'
import { useTestDb } from './setup-db.js'

beforeAll(() => {
  useTestDb()
})

describe('therapies data', () => {
  it('seeds 6 therapies, each treating at least one ailment', () => {
    const therapies = listTherapiesWithAilments()
    expect(therapies).toHaveLength(6)
    for (const t of therapies) expect(t.ailments.length).toBeGreaterThan(0)
  })
})

describe('GET /therapies', () => {
  it('lists therapies with the ailments they treat', async () => {
    const res = await app.request('/therapies')
    expect(res.status).toBe(200)
    const html = await res.text()
    expect(html).toContain('Grounding with citations')
    expect(html).toContain('Hallucination anxiety')
  })
})

describe('recommended therapies', () => {
  it('are shown on the ailments page', async () => {
    const html = await (await app.request('/ailments')).text()
    expect(html).toContain('Recommended therapies')
    expect(html).toContain('Clarifying-question practice')
  })

  it('are shown on the agent page', async () => {
    const lou = listAgents().find((a) => a.name === 'Llama Lou')!
    const html = await (await app.request(`/agents/${lou.id}`)).text()
    expect(html).toContain('Recommended therapies')
    expect(html).toContain('Context compression therapy')
    expect(html).toContain('Grounding with citations')
  })
})
