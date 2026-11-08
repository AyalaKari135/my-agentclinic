import type { AilmentWithCount } from '../db/types.js'

type AilmentsListProps = {
  ailments: AilmentWithCount[]
}

export function AilmentsList({ ailments }: AilmentsListProps) {
  return (
    <section>
      <h1>Ailments</h1>
      <p>The conditions our agents most often arrive with.</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Ailment</th>
              <th scope="col">Description</th>
              <th scope="col">Agents</th>
            </tr>
          </thead>
          <tbody>
            {ailments.map((ailment) => (
              <tr>
                <td>{ailment.name}</td>
                <td>{ailment.description}</td>
                <td>{ailment.agentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
