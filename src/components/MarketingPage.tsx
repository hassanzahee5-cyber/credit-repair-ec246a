import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import plans, { formatPrice } from '../data/plans'
import { faqs, promises, stats, steps } from '../data/site'
import { ConsultationForm } from './ConsultationForm'
import { CreditCheckup } from './CreditCheckup'
import { ScoreGauge } from './ScoreGauge'
import { SiteFooter, SiteHeader } from './SiteChrome'

const img = (file: string, w: number) =>
  `/.netlify/images?url=/img/${file}&w=${w}&fm=webp`

export function MarketingPage() {
  const [planId, setPlanId] = useState('accelerated')
  const [issueLabels, setIssueLabels] = useState<Array<string>>([])

  return (
    <>
      <div className="bg-cream">
        <SiteHeader />
        <main id="top">
          {/* Hero */}
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-14">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium shadow-sm">
                <span className="h-2 w-2 rounded-full bg-clay" aria-hidden />
                No upfront fees · Cancel any time
              </p>
              <h1 className="font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Your credit report should tell the{' '}
                <em className="relative whitespace-nowrap not-italic">
                  <span className="relative z-10 italic">truth.</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 h-4 -rotate-1 bg-lime sm:h-5"
                  />
                </em>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
                One in five Americans has an error on at least one credit
                report. We review all three bureaus, dispute what’s
                inaccurate, and coach you toward the score you’ve earned.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#consultation" className="action">
                  Get my free credit review →
                </a>
                <a href="#checkup" className="action-ghost">
                  Take the 60-second check-up
                </a>
              </div>
              <p className="mt-6 text-sm text-muted">
                Soft pull only — reviewing your report never affects your
                score.
              </p>
            </div>

            <div className="relative">
              <img
                src={img('hero.png', 1000)}
                srcSet={`${img('hero.png', 640)} 640w, ${img('hero.png', 1000)} 1000w, ${img('hero.png', 1400)} 1400w`}
                sizes="(min-width: 1024px) 48vw, 100vw"
                alt="A couple smiling while reviewing their credit paperwork at a kitchen table"
                className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl"
                fetchPriority="high"
              />
              <div className="absolute -bottom-10 -left-4 w-60 rounded-3xl bg-ink p-5 text-cream shadow-2xl sm:-left-8 sm:w-72">
                <ScoreGauge score={712} label="Example score" />
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    ['Duplicate collection', 'Removed'],
                    ['Late payment · 2022', 'Updated'],
                    ['Unknown inquiry', 'Disputed'],
                  ].map(([item, status]) => (
                    <li
                      key={item}
                      className="flex items-center justify-between gap-2 rounded-lg bg-cream/10 px-3 py-2"
                    >
                      <span>{item}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-semibold ${
                          status === 'Disputed'
                            ? 'bg-cream/20'
                            : 'bg-lime text-ink'
                        }`}
                      >
                        {status}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[10px] text-cream/50">
                  Illustration only. Results vary.
                </p>
              </div>
            </div>
          </section>

          {/* Stats strip */}
          <section aria-label="At a glance" className="border-y border-ink/10 bg-paper">
            <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col py-8 pr-4">
                  <dt className="order-2 text-sm text-muted">{stat.label}</dt>
                  <dd className="font-display text-3xl sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </main>
      </div>

      {/* How it works */}
      <section
        id="how"
        aria-labelledby="how-heading"
        className="mx-auto max-w-7xl scroll-mt-6 px-5 py-20 lg:py-28"
      >
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-clay mb-4">How it works</p>
            <h2
              id="how-heading"
              className="font-display text-4xl leading-[1.05] sm:text-5xl"
            >
              A clear process, start to finish.
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            You see every letter we send and every response we receive. No
            black box, no surprises on your bill.
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group rounded-3xl border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="font-display text-5xl text-ink/15 transition group-hover:text-clay">
                0{index + 1}
              </span>
              <h3 className="mt-6 mb-3 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="bg-white">
        <CreditCheckup
          onApply={(id, labels) => {
            setPlanId(id)
            setIssueLabels(labels)
          }}
        />
      </div>

      {/* Plans */}
      <section
        id="plans"
        aria-labelledby="plans-heading"
        className="mx-auto max-w-7xl scroll-mt-6 px-5 py-20 lg:py-28"
      >
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow text-clay mb-4">Plans & pricing</p>
          <h2
            id="plans-heading"
            className="font-display text-4xl leading-[1.05] sm:text-5xl"
          >
            Simple monthly plans. Never billed in advance.
          </h2>
          <p className="mt-5 text-muted">
            $0 setup fee. You’re charged at the end of each month for work
            already completed — cancel whenever you like.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl p-8 ${
                plan.featured
                  ? 'bg-ink text-cream shadow-2xl lg:-my-4 lg:py-12'
                  : 'border border-ink/10 bg-white'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p
                className={`mt-2 mb-6 ${plan.featured ? 'text-cream/70' : 'text-muted'}`}
              >
                {plan.blurb}
              </p>
              <p className="mb-6">
                <span className="font-display text-5xl">
                  {formatPrice(plan.price)}
                </span>
                <span className={plan.featured ? 'text-cream/70' : 'text-muted'}>
                  /month
                </span>
              </p>
              <ul className="mb-8 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span
                      aria-hidden
                      className={plan.featured ? 'text-lime' : 'text-clay'}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-4">
                <a
                  href="#consultation"
                  className={plan.featured ? 'action-lime' : 'action'}
                  onClick={() => setPlanId(plan.id)}
                >
                  Choose {plan.name}
                </a>
                <Link
                  to="/plans/$planId"
                  params={{ planId: plan.id }}
                  className="text-sm font-semibold underline"
                >
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Honesty section */}
      <section aria-labelledby="honest-heading" className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <img
            src={img('advisor.png', 800)}
            srcSet={`${img('advisor.png', 500)} 500w, ${img('advisor.png', 800)} 800w`}
            sizes="(min-width: 1024px) 38vw, 100vw"
            alt="A smiling credit advisor holding a tablet in a bright office"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover"
          />
          <div>
            <p className="eyebrow text-clay mb-4">Straight talk</p>
            <h2
              id="honest-heading"
              className="font-display text-4xl leading-[1.05] sm:text-5xl mb-6"
            >
              What we can do — and what nobody honestly can.
            </h2>
            <p className="text-muted text-lg mb-10 max-w-xl">
              Credit repair has a reputation problem. We’d rather tell you the
              truth on day one than sell you a promise we can’t keep.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-7">
                <h3 className="mb-4 font-semibold">We will</h3>
                <ul className="space-y-3 text-sm">
                  {promises.can.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="text-ink font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-ink/15 p-7">
                <h3 className="mb-4 font-semibold">We won’t</h3>
                <ul className="space-y-3 text-sm text-muted">
                  {promises.cannot.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="text-clay font-bold">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="mx-auto grid max-w-7xl scroll-mt-6 gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28"
      >
        <div>
          <p className="eyebrow text-clay mb-4">Questions</p>
          <h2
            id="faq-heading"
            className="font-display text-4xl leading-[1.05] sm:text-5xl"
          >
            Good questions to ask any credit repair company.
          </h2>
        </div>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq, index) => (
            <details key={faq.q} className="group py-6" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                {faq.q}
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 transition group-open:rotate-45 group-open:bg-ink group-open:text-cream"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ConsultationForm
        planId={planId}
        onPlanChange={setPlanId}
        issues={issueLabels}
      />
      <SiteFooter />
    </>
  )
}
