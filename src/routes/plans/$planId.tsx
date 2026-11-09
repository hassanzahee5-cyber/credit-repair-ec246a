import { createFileRoute, notFound } from '@tanstack/react-router'
import { findPlan } from '../../data/plans'
import { site } from '../../data/site'
import { PlanPage } from '../../components/PlanPage'

export const Route = createFileRoute('/plans/$planId')({
  loader: ({ params }) => {
    const plan = findPlan(params.planId)
    if (!plan) throw notFound()
    return plan
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} plan | ${site.name}` },
            { name: 'description', content: loaderData.blurb },
            {
              property: 'og:title',
              content: `${loaderData.name} plan | ${site.name}`,
            },
            { property: 'og:description', content: loaderData.blurb },
          ],
        }
      : {},
  component: PlanRoute,
})

function PlanRoute() {
  const plan = Route.useLoaderData()
  return <PlanPage key={plan.id} plan={plan} />
}
