import { Hono } from 'hono'
import { Layout } from '../components/Layout.js'
import { TherapiesList } from '../components/TherapiesList.js'
import { listTherapiesWithAilments } from '../db/therapies.js'

export const therapiesRoute = new Hono()

therapiesRoute.get('/', (c) =>
  c.html(
    <Layout title="Therapies">
      <TherapiesList therapies={listTherapiesWithAilments()} />
    </Layout>,
  ),
)
