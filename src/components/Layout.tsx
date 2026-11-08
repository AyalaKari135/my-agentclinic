import type { Child } from 'hono/jsx'
import { raw } from 'hono/html'
import { Header } from './Header.js'
import { Main } from './Main.js'
import { Footer } from './Footer.js'

type LayoutProps = {
  title: string
  /** Current nav section, e.g. `/agents`. */
  section?: string
  children: Child
}

export function Layout({ title, section, children }: LayoutProps) {
  return (
    <>
      {raw('<!doctype html>')}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title === 'AgentClinic' ? title : `${title} · AgentClinic`}</title>
          <link rel="stylesheet" href="/static/style.css" />
        </head>
        <body>
          <a class="skip-link" href="#content">
            Skip to content
          </a>
          <Header section={section} />
          <Main>{children}</Main>
          <Footer />
        </body>
      </html>
    </>
  )
}
