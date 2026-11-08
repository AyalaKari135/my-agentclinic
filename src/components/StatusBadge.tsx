import type { AgentStatus } from '../db/types.js'

type StatusBadgeProps = {
  status: AgentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span class={`badge badge-${status}`}>{status}</span>
}
