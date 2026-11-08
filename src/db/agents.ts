import { getDb } from './index.js'
import type { Agent, Ailment } from './types.js'

export function listAgents(): Agent[] {
  return getDb().prepare('SELECT * FROM agents ORDER BY name').all() as Agent[]
}

export function getAgent(id: number): Agent | undefined {
  return getDb().prepare('SELECT * FROM agents WHERE id = ?').get(id) as Agent | undefined
}

export function getAgentAilments(agentId: number): Ailment[] {
  return getDb()
    .prepare(
      `SELECT i.* FROM ailments i
       JOIN agent_ailments ai ON ai.ailment_id = i.id
       WHERE ai.agent_id = ? ORDER BY i.name`,
    )
    .all(agentId) as Ailment[]
}
