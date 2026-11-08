import type { Agent } from '../db/types.js'
import { StatusBadge } from './StatusBadge.js'

type AgentsListProps = {
  agents: Agent[]
}

export function AgentsList({ agents }: AgentsListProps) {
  return (
    <section>
      <h1>Agents</h1>
      <p>{agents.length} agents are registered at the clinic.</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Model</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr>
                <td>
                  <a href={`/agents/${agent.id}`}>{agent.name}</a>
                </td>
                <td>{agent.model}</td>
                <td>
                  <StatusBadge status={agent.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
