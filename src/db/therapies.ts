import { getDb } from './index.js'
import type { Therapy, TherapyWithAilments } from './types.js'

type TherapyRow = Therapy & { ailments: string }

export function listTherapiesWithAilments(): TherapyWithAilments[] {
  const rows = getDb()
    .prepare(
      `SELECT t.*,
         (SELECT json_group_array(i.name) FROM ailment_therapies at
            JOIN ailments i ON i.id = at.ailment_id WHERE at.therapy_id = t.id) AS ailments
       FROM therapies t ORDER BY t.name`,
    )
    .all() as TherapyRow[]
  return rows.map((r) => ({ ...r, ailments: (JSON.parse(r.ailments) as string[]).sort() }))
}

/** Distinct therapies recommended for any of the given ailments. */
export function getRecommendedTherapies(ailmentIds: number[]): Therapy[] {
  if (ailmentIds.length === 0) return []
  const placeholders = ailmentIds.map(() => '?').join(', ')
  return getDb()
    .prepare(
      `SELECT DISTINCT t.* FROM therapies t
       JOIN ailment_therapies at ON at.therapy_id = t.id
       WHERE at.ailment_id IN (${placeholders}) ORDER BY t.name`,
    )
    .all(...ailmentIds) as Therapy[]
}
