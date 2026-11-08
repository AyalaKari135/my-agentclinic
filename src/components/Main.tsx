import type { Child } from 'hono/jsx'

type MainProps = {
  children: Child
}

export function Main({ children }: MainProps) {
  return (
    <main id="content" class="site-main" tabindex={-1}>
      {children}
    </main>
  )
}
