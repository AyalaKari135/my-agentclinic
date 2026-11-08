import type { MiddlewareHandler } from 'hono'

type Log = (line: string) => void

const defaultLog: Log = process.env.VITEST ? () => {} : (line) => console.log(line)

/** Logs `METHOD path status durationms` for every request. */
export function requestLogger(log: Log = defaultLog): MiddlewareHandler {
  return async (c, next) => {
    const start = performance.now()
    await next()
    const ms = Math.round(performance.now() - start)
    log(`${c.req.method} ${c.req.path} ${c.res.status} ${ms}ms`)
  }
}
