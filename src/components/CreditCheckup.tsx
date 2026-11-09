import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { formatPrice, recommendPlan } from '../data/plans'
import { issues } from '../data/site'

export function CreditCheckup({
  onApply,
}: {
  onApply: (planId: string, issueLabels: Array<string>) => void
}) {
  const [selected, setSelected] = useState<Array<string>>([])
  const [joint, setJoint] = useState(false)

  const chosen = issues.filter((issue) => selected.includes(issue.id))
  const weight = chosen.reduce((sum, issue) => sum + issue.weight, 0)
  const plan = recommendPlan(weight, joint)
  const rounds = Math.min(6, Math.max(2, Math.ceil(weight / 2) + 1))

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  return (
    <section
      id="checkup"
      aria-labelledby="checkup-heading"
      className="mx-auto max-w-7xl px-5 py-20 lg:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow text-clay mb-4">60-second credit check-up</p>
          <h2
            id="checkup-heading"
            className="font-display text-4xl sm:text-5xl leading-[1.05] mb-4"
          >
            What’s showing up on your report?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl">
            Pick everything that applies. We’ll suggest a starting plan — your
            advisor confirms it after reviewing your actual reports.
          </p>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Credit issues">
            {issues.map((issue) => {
              const on = selected.includes(issue.id)
              return (
                <button
                  key={issue.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(issue.id)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    on
                      ? 'border-ink bg-ink text-cream'
                      : 'border-ink/20 bg-white hover:border-ink/50'
                  }`}
                >
                  {on ? '✓ ' : '+ '}
                  {issue.label}
                </button>
              )
            })}
          </div>
          <label className="mt-8 inline-flex cursor-pointer items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={joint}
              onChange={(event) => setJoint(event.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="relative h-6 w-11 rounded-full bg-ink/15 transition peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"
            />
            I’m applying with a partner or spouse
          </label>
        </div>

        <div
          aria-live="polite"
          className="relative overflow-hidden rounded-3xl bg-cream p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime/50 blur-2xl"
          />
          <p className="eyebrow text-muted mb-3 relative">Suggested starting point</p>
          <h3 className="font-display text-4xl mb-1 relative">{plan.name}</h3>
          <p className="text-muted mb-6 relative">{plan.blurb}</p>
          <dl className="grid grid-cols-2 gap-4 mb-8 relative">
            <div className="rounded-2xl bg-white/70 p-4">
              <dt className="text-xs text-muted">Monthly</dt>
              <dd className="font-display text-2xl">
                {formatPrice(plan.price)}
              </dd>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <dt className="text-xs text-muted">Dispute rounds</dt>
              <dd className="font-display text-2xl">
                {chosen.length ? `~${rounds}` : '—'}
              </dd>
            </div>
          </dl>
          <p className="text-sm text-muted mb-6 relative">
            {chosen.length === 0
              ? 'Select at least one item to tailor this suggestion.'
              : `${chosen.length} item type${chosen.length > 1 ? 's' : ''} selected · ${plan.timeline.toLowerCase()}.`}
          </p>
          <div className="flex flex-wrap items-center gap-4 relative">
            <a
              href="#consultation"
              className="action"
              onClick={() =>
                onApply(
                  plan.id,
                  chosen.map((issue) => issue.label),
                )
              }
            >
              Start with {plan.name}
            </a>
            <Link
              to="/plans/$planId"
              params={{ planId: plan.id }}
              className="text-sm font-semibold underline"
            >
              Plan details
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
