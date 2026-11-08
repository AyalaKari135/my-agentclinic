import { getDb } from './index.js'
import { migrate } from './migrate.js'
import { seed } from './seed.js'

const command = process.argv[2]

if (command !== 'migrate' && command !== 'seed') {
  console.error('Usage: tsx src/db/cli.ts <migrate|seed>')
  process.exit(1)
}

const db = getDb()
const applied = migrate(db)
console.log(applied.length ? `Applied migrations: ${applied.join(', ')}` : 'Database is up to date')

if (command === 'seed') {
  seed(db)
  console.log('Seed data loaded')
}
