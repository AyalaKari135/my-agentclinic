import type { Agent, Ailment } from '../db/types.js'
import { StatusBadge } from './StatusBadge.js'

type AgentDetailProps = {
  agent: Agent
  ailments: Ailment[]
}

export function AgentDetail({ agent, ailments }: AgentDetailProps) {
  return (
    <article>
      <p>
        <a href="/agents">← All agents</a>
      </p>
      <h1>{agent.name}</h1>
      <dl class="details">
        <dt>Model</dt>
        <dd>{agent.model}</dd>
        <dt>Status</dt>
        <dd>
          <StatusBadge status={agent.status} />
        </dd>
        <dt>Presenting complaint</dt>
        <dd>{agent.complaint}</dd>
      </dl>
      <h2>Ailments</h2>
      {ailments.length === 0 ? (
        <p>No ailments recorded.</p>
      ) : (
        <ul>
          {ailments.map((ailment) => (
            <li>
              <strong>{ailment.name}</strong> — {ailment.description}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
