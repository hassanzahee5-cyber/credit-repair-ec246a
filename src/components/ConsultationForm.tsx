import { useRef, useState, type FormEvent } from 'react'
import plans, { formatPrice } from '../data/plans'
import { consultationForm, goals, scoreRanges, site } from '../data/site'

type Submission =
  | { status: 'idle' | 'pending' | 'error' }
  | { status: 'success'; firstName: string }

export function ConsultationForm({
  planId,
  onPlanChange,
  issues = [],
}: {
  planId: string
  onPlanChange: (id: string) => void
  issues?: Array<string>
}) {
  const [submission, setSubmission] = useState<Submission>({ status: 'idle' })
  const submitting = useRef(false)
  const plan = plans.find((item) => item.id === planId)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || submission.status === 'success') return
    const data = new FormData(event.currentTarget)
    const body = new URLSearchParams()
    data.forEach((value, key) => body.append(key, String(value)))
    const firstName = String(data.get('name') ?? '').trim().split(/\s+/)[0]
    submitting.current = true
    setSubmission({ status: 'pending' })
    try {
      const response = await fetch(consultationForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Request was not accepted')
      setSubmission({ status: 'success', firstName })
    } catch {
      setSubmission({ status: 'error' })
    } finally {
      submitting.current = false
    }
  }

  return (
    <section
      id="consultation"
      tabIndex={-1}
      aria-labelledby="consultation-heading"
      className="scroll-mt-6 bg-ink text-cream"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.2fr] lg:py-28">
        <div>
          <p className="eyebrow text-lime mb-4">Free consultation</p>
          <h2
            id="consultation-heading"
            className="font-display text-4xl sm:text-5xl leading-[1.05] mb-6"
          >
            Talk to a real advisor about your report.
          </h2>
          <p id="consultation-note" className="text-cream/75 text-lg mb-8">
            Tell us a little about your situation and a certified credit
            advisor will call you within one business day. The review is a
            soft pull — it never affects your score — and there’s no obligation
            to sign up.
          </p>
          <ul className="space-y-3 text-cream/85">
            {[
              'No upfront fees — billed only after work is performed',
              'Written contract with a 3-day right to cancel',
              'Your information is never sold or shared',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-ink text-xs font-bold"
                >
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-cream/15 pt-6 text-sm text-cream/70">
            Prefer to call?{' '}
            <a href={site.phoneHref} className="font-semibold text-cream underline">
              {site.phone}
            </a>
            <br />
            {site.hours}
          </div>
        </div>

        <form
          name={consultationForm.name}
          method="POST"
          action={consultationForm.endpoint}
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          aria-busy={submission.status === 'pending'}
          className="rounded-3xl bg-paper p-6 text-ink shadow-2xl sm:p-10"
        >
          <input type="hidden" name="form-name" value={consultationForm.name} />
          <input
            type="hidden"
            name="subject"
            value={`Free consultation request: ${plan?.name ?? 'No plan selected'}`}
          />
          <input type="hidden" name="plan-name" value={plan?.name ?? ''} />
          <input type="hidden" name="issues" value={issues.join(', ')} />
          <p hidden>
            <label>
              Leave this empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          {submission.status === 'success' ? (
            <div className="py-10 text-center" role="status">
              <div
                aria-hidden
                className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-lime text-2xl"
              >
                ✓
              </div>
              <h3 className="font-display text-3xl mb-3">
                Thanks{submission.firstName ? `, ${submission.firstName}` : ''}!
              </h3>
              <p className="text-muted max-w-sm mx-auto">
                Your request is in. An advisor will reach out within one
                business day to schedule your free credit review.
              </p>
              <button
                type="button"
                className="mt-8 underline"
                onClick={() => setSubmission({ status: 'idle' })}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <fieldset
              disabled={submission.status === 'pending'}
              className="grid gap-5 sm:grid-cols-2 disabled:opacity-70"
            >
              <legend className="sr-only">Request a free consultation</legend>
              <div className="sm:col-span-2">
                <label htmlFor="c-name" className="form-label">
                  Full name
                </label>
                <input
                  id="c-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="form-label">
                  Email
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="c-phone" className="form-label">
                  Phone
                </label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={30}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="c-score" className="form-label">
                  Estimated score
                </label>
                <select
                  id="c-score"
                  name="score-range"
                  className="form-input"
                  defaultValue="Not sure"
                >
                  {scoreRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="c-goal" className="form-label">
                  Main goal
                </label>
                <select
                  id="c-goal"
                  name="goal"
                  className="form-input"
                  defaultValue={goals[0]}
                >
                  {goals.map((goal) => (
                    <option key={goal}>{goal}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-plan" className="form-label">
                  Plan you’re interested in
                </label>
                <select
                  id="c-plan"
                  name="plan-id"
                  value={planId}
                  onChange={(event) => onPlanChange(event.target.value)}
                  className="form-input"
                >
                  {plans.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} · {formatPrice(item.price)}/mo
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="form-label">
                  Anything we should know?{' '}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  maxLength={2000}
                  rows={4}
                  placeholder="e.g. A collection I don't recognize, applying for a mortgage in spring…"
                  className="form-input"
                />
              </div>
              {issues.length > 0 && (
                <p className="sm:col-span-2 rounded-xl bg-lime/30 px-4 py-3 text-sm">
                  <strong>From your check-up:</strong> {issues.join(', ')}
                </p>
              )}
              <label className="sm:col-span-2 flex gap-3 text-sm text-muted">
                <input
                  type="checkbox"
                  name="consent"
                  value="yes"
                  required
                  className="mt-0.5 h-4 w-4 accent-ink"
                />
                I agree to be contacted by Credit Repair Solutions by phone or
                email about my consultation.
              </label>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  aria-describedby="consultation-note"
                  className="action w-full sm:w-auto"
                >
                  {submission.status === 'pending'
                    ? 'Sending…'
                    : 'Request my free review →'}
                </button>
              </div>
              <p role="status" className="sr-only">
                {submission.status === 'pending' ? 'Sending your request…' : ''}
              </p>
              {submission.status === 'error' && (
                <p
                  role="alert"
                  className="sm:col-span-2 rounded-xl bg-clay/15 px-4 py-3 text-sm"
                >
                  We couldn’t send your request. Your details are still here —
                  please try again, or call us at {site.phone}.
                </p>
              )}
            </fieldset>
          )}
        </form>
      </div>
    </section>
  )
}
