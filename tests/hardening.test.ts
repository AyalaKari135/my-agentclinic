import { beforeAll, describe, expect, it } from 'vitest'
import { Hono } from 'hono'
import { app } from '../src/app.js'
import { requestLogger } from '../src/middleware/logger.js'
import { useTestDb } from './setup-db.js'

beforeAll(() => {
  useTestDb()
  app.get('/__test/boom', () => {
    throw new Error('boom')
  })
})

describe('error pages', () => {
  it('renders the 500 page when a handler throws', async () => {
    const res = await app.request('/__test/boom')
    expect(res.status).toBe(500)
    const html = await res.text()
    expect(html).toContain('Something went wrong')
    expect(html).not.toContain('boom')
  })

  it('renders the 404 page for unknown URLs', async () => {
    const res = await app.request('/does/not/exist')
    expect(res.status).toBe(404)
    expect(await res.text()).toContain('Page not found')
  })
})

describe('requestLogger', () => {
  it('logs method, path, status and duration', async () => {
    const lines: string[] = []
    const logged = new Hono()
    logged.use(requestLogger((line) => lines.push(line)))
    logged.get('/hello', (c) => c.text('hi'))

    await logged.request('/hello')
    await logged.request('/missing')

    expect(lines[0]).toMatch(/^GET \/hello 200 \d+ms$/)
    expect(lines[1]).toMatch(/^GET \/missing 404 \d+ms$/)
  })
})
