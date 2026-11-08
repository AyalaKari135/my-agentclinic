import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export type DB = Database.Database

let db: DB | undefined

export function openDb(path = process.env.DB_PATH ?? 'data/agentclinic.db'): DB {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true })
  const conn = new Database(path)
  conn.pragma('foreign_keys = ON')
  return conn
}

export function getDb(): DB {
  db ??= openDb()
  return db
}

/** Replace the shared connection (used by tests with an in-memory database). */
export function setDb(conn: DB): void {
  db = conn
}
