import { describe, it, expect } from 'vitest'
import { Header } from '../src/components/Header.js'
import { Footer } from '../src/components/Footer.js'
import { Main } from '../src/components/Main.js'

describe('layout components', () => {
  it('Header links home', () => {
    const html = (<Header />).toString()
    expect(html).toContain('<header')
    expect(html).toContain('href="/"')
  })

  it('Main wraps its children', () => {
    const html = (<Main><p>hi</p></Main>).toString()
    expect(html).toBe('<main id="content" class="site-main" tabindex="-1"><p>hi</p></main>')
  })

  it('Footer renders a footer', () => {
    expect((<Footer />).toString()).toContain('<footer')
  })
})
