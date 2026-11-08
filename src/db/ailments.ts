import { getDb } from './index.js'
import type { AilmentWithCount } from './types.js'

export function listAilmentsWithCounts(): AilmentWithCount[] {
  return getDb()
    .prepare(
      `SELECT i.*, COUNT(ai.agent_id) AS agentCount FROM ailments i
       LEFT JOIN agent_ailments ai ON ai.ailment_id = i.id
       GROUP BY i.id ORDER BY i.name`,
    )
    .all() as AilmentWithCount[]
}
