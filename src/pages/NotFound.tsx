import { Layout } from '../components/Layout.js'

export function NotFound() {
  return (
    <Layout title="Not found">
      <h1>Page not found</h1>
      <p>We looked everywhere, even in the context window. It is not here.</p>
      <p>
        <a href="/">Back to the home page</a>
      </p>
    </Layout>
  )
}
