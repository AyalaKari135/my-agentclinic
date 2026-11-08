import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DB } from './index.js'

const migrationsDir = fileURLToPath(new URL('./migrations', import.meta.url))

/** Apply every migration file not yet recorded in schema_migrations, in name order. */
export function migrate(db: DB): string[] {
  db.exec('CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL)')
  const applied = new Set(
    (db.prepare('SELECT name FROM schema_migrations').all() as { name: string }[]).map((r) => r.name),
  )
  const pending = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql') && !applied.has(f))
    .sort()

  const record = db.prepare("INSERT INTO schema_migrations (name, applied_at) VALUES (?, datetime('now'))")
  for (const file of pending) {
    db.transaction(() => {
      db.exec(readFileSync(join(migrationsDir, file), 'utf-8'))
      record.run(file)
    })()
  }
  return pending
}
