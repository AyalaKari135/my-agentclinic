import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app.js'
import { useTestDb } from './setup-db.js'

beforeAll(() => {
  useTestDb()
})

const pages = [
  ['/', '/'],
  ['/agents', '/agents'],
  ['/agents/1', '/agents'],
  ['/ailments', '/ailments'],
  ['/therapies', '/therapies'],
  ['/dashboard', '/dashboard'],
] as const

describe.each(pages)('%s', (url, section) => {
  it('has a skip link to the main content', async () => {
    const html = await (await app.request(url)).text()
    expect(html).toContain('<a class="skip-link" href="#content">')
    expect(html).toContain('<main id="content"')
  })

  it(`marks ${section} as the current nav item`, async () => {
    const html = await (await app.request(url)).text()
    expect(html).toContain(`<a href="${section}" aria-current="page">`)
    expect(html.match(/aria-current="page"/g)).toHaveLength(1)
  })

  it('has exactly one h1', async () => {
    const html = await (await app.request(url)).text()
    expect(html.match(/<h1[ >]/g)).toHaveLength(1)
  })
})

describe('stylesheet', () => {
  it('defines visible focus styles', async () => {
    const css = await (await app.request('/static/style.css')).text()
    expect(css).toContain(':focus-visible')
  })
})
