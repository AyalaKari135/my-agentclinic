import { getDb } from './index.js'
import type { AilmentWithCount, AilmentWithTherapies } from './types.js'

type AilmentRow = AilmentWithCount & { therapies: string }

export function listAilmentsWithCounts(): AilmentWithTherapies[] {
  const rows = getDb()
    .prepare(
      `SELECT i.*,
         (SELECT COUNT(*) FROM agent_ailments ai WHERE ai.ailment_id = i.id) AS agentCount,
         (SELECT json_group_array(t.name) FROM ailment_therapies at
            JOIN therapies t ON t.id = at.therapy_id WHERE at.ailment_id = i.id) AS therapies
       FROM ailments i ORDER BY i.name`,
    )
    .all() as AilmentRow[]
  return rows.map((r) => ({ ...r, therapies: (JSON.parse(r.therapies) as string[]).sort() }))
}
