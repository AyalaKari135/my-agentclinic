import { Layout } from '../components/Layout.js'

export function ServerError() {
  return (
    <Layout title="Something went wrong">
      <h1>Something went wrong</h1>
      <p>Even clinics have bad days. The problem has been logged; please try again in a moment.</p>
      <p>
        <a href="/">Back to the home page</a>
      </p>
    </Layout>
  )
}
