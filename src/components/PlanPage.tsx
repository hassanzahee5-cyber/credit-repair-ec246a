import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import plans, { formatPrice, type Plan } from '../data/plans'
import { ConsultationForm } from './ConsultationForm'
import { SiteFooter, SiteHeader } from './SiteChrome'

export function PlanPage({ plan }: { plan: Plan }) {
  const [planId, setPlanId] = useState(plan.id)
  const others = plans.filter((item) => item.id !== plan.id)
  return (
    <>
      <div className="bg-cream">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-5 pb-20 pt-6">
          <Link to="/" hash="plans" className="text-sm font-semibold underline">
            ← All plans
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="eyebrow text-clay mb-4">{plan.bestFor}</p>
              <h1 className="font-display text-5xl leading-[1] sm:text-6xl mb-6">
                {plan.name}
              </h1>
              <p className="max-w-2xl text-lg text-muted">{plan.description}</p>
              <h2 className="mt-12 mb-5 text-xl font-semibold">What’s included</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 rounded-2xl bg-white p-4">
                    <span aria-hidden className="text-clay font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="h-fit rounded-3xl bg-ink p-8 text-cream lg:sticky lg:top-8">
              <p className="text-sm text-cream/70">Monthly, billed after work is done</p>
              <p className="mt-2 mb-6">
                <span className="font-display text-6xl">{formatPrice(plan.price)}</span>
                <span className="text-cream/70">/month</span>
              </p>
              <dl className="mb-8 space-y-3 text-sm">
                <div className="flex justify-between border-b border-cream/15 pb-3">
                  <dt className="text-cream/70">Setup fee</dt>
                  <dd>{formatPrice(plan.setupFee)}</dd>
                </div>
                <div className="flex justify-between border-b border-cream/15 pb-3">
                  <dt className="text-cream/70">Timeline</dt>
                  <dd>{plan.timeline}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-cream/70">Contract</dt>
                  <dd>Month to month</dd>
                </div>
              </dl>
              <a
                href="#consultation"
                className="action-lime w-full"
                onClick={() => setPlanId(plan.id)}
              >
                Start with a free review
              </a>
              <p className="mt-4 text-xs text-cream/50">
                Results vary. We can’t remove accurate, timely information.
              </p>
            </aside>
          </div>
          <div className="mt-16 flex flex-wrap gap-4 text-sm">
            <span className="text-muted">Compare:</span>
            {others.map((other) => (
              <Link
                key={other.id}
                to="/plans/$planId"
                params={{ planId: other.id }}
                className="font-semibold underline"
              >
                {other.name} · {formatPrice(other.price)}/mo
              </Link>
            ))}
          </div>
        </main>
      </div>
      <ConsultationForm planId={planId} onPlanChange={setPlanId} />
      <SiteFooter />
    </>
  )
}
