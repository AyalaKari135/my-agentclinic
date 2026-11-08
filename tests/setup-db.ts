import { openDb, setDb, type DB } from '../src/db/index.js'
import { migrate } from '../src/db/migrate.js'
import { seed } from '../src/db/seed.js'

/** Fresh in-memory database, migrated and seeded, used by the app for this test file. */
export function useTestDb(): DB {
  const db = openDb(':memory:')
  migrate(db)
  seed(db)
  setDb(db)
  return db
}
