import { Hono } from 'hono'
import { Layout } from '../components/Layout.js'
import { AilmentsList } from '../components/AilmentsList.js'
import { listAilmentsWithCounts } from '../db/ailments.js'

export const ailmentsRoute = new Hono()

ailmentsRoute.get('/', (c) =>
  c.html(
    <Layout title="Ailments">
      <AilmentsList ailments={listAilmentsWithCounts()} />
    </Layout>,
  ),
)
