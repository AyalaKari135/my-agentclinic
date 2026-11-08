import { defineConfig } from 'vitest/config'

export default defineConfig({
  oxc: {
    jsx: {
      runtime: 'automatic',
      importSource: 'hono/jsx',
    },
  },
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
