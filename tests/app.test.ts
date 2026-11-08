import { describe, it, expect } from 'vitest'
import { app } from '../src/app.js'

describe('GET /', () => {
  it('returns an HTML page', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/html')
  })

  it('says AgentClinic is open for business', async () => {
    const html = await (await app.request('/')).text()
    expect(html).toContain('<title>AgentClinic</title>')
    expect(html).toContain('AgentClinic is open for business')
  })

  it('renders inside the layout', async () => {
    const html = await (await app.request('/')).text()
    expect(html.startsWith('<!doctype html>')).toBe(true)
    expect(html).toContain('<header')
    expect(html).toContain('<main')
    expect(html).toContain('<footer')
    expect(html).toContain('href="/static/style.css"')
    expect(html).toContain('name="viewport"')
  })
})

describe('GET /static/style.css', () => {
  it('serves the stylesheet', async () => {
    const res = await app.request('/static/style.css')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/css')
  })
})
