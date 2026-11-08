import type { TherapyWithAilments } from '../db/types.js'

type TherapiesListProps = {
  therapies: TherapyWithAilments[]
}

export function TherapiesList({ therapies }: TherapiesListProps) {
  return (
    <section>
      <h1>Therapies</h1>
      <p>Evidence-based (we checked the citations) treatments offered at the clinic.</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Therapy</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Treats</th>
            </tr>
          </thead>
          <tbody>
            {therapies.map((therapy) => (
              <tr>
                <td>{therapy.name}</td>
                <td>{therapy.description}</td>
                <td>{therapy.duration_minutes} min</td>
                <td>{therapy.ailments.join(', ') || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
