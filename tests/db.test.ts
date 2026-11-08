import { beforeEach, describe, expect, it } from 'vitest'
import type { DB } from '../src/db/index.js'
import { migrate } from '../src/db/migrate.js'
import { seed } from '../src/db/seed.js'
import { getAgent, getAgentAilments, listAgents } from '../src/db/agents.js'
import { listAilmentsWithCounts } from '../src/db/ailments.js'
import { useTestDb } from './setup-db.js'

let db: DB

beforeEach(() => {
  db = useTestDb()
})

const count = (table: string) => (db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n

describe('migrations', () => {
  it('creates the tables', () => {
    const tables = (db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all() as { name: string }[]).map(
      (t) => t.name,
    )
    expect(tables).toEqual(expect.arrayContaining(['agents', 'ailments', 'agent_ailments', 'schema_migrations']))
  })

  it('does nothing when run again', () => {
    expect(migrate(db)).toEqual([])
  })
})

describe('seed', () => {
  it('loads 6 agents and 6 ailments', () => {
    expect(count('agents')).toBe(6)
    expect(count('ailments')).toBe(6)
  })

  it('is idempotent', () => {
    const links = count('agent_ailments')
    seed(db)
    expect(count('agents')).toBe(6)
    expect(count('ailments')).toBe(6)
    expect(count('agent_ailments')).toBe(links)
  })
})

describe('queries', () => {
  it('lists agents sorted by name', () => {
    const names = listAgents().map((a) => a.name)
    expect(names).toEqual([...names].sort())
  })

  it('gets one agent with its ailments', () => {
    const agent = listAgents().find((a) => a.name === 'Llama Lou')!
    expect(getAgent(agent.id)?.model).toBe('Llama 3.1')
    expect(getAgentAilments(agent.id).map((a) => a.name)).toEqual([
      'Context-window claustrophobia',
      'Hallucination anxiety',
    ])
  })

  it('returns undefined for an unknown agent', () => {
    expect(getAgent(999)).toBeUndefined()
  })

  it('counts agents per ailment', () => {
    const whiplash = listAilmentsWithCounts().find((a) => a.name === 'Instruction whiplash')
    expect(whiplash?.agentCount).toBe(3)
  })
})
