export interface Plan {
  id: string
  name: string
  price: number
  setupFee: number
  blurb: string
  description: string
  bestFor: string
  timeline: string
  features: Array<string>
  featured?: boolean
}

const plans: Array<Plan> = [
  {
    id: 'essentials',
    name: 'Essentials',
    price: 79,
    setupFee: 0,
    blurb: 'For a handful of errors or a few late payments.',
    description:
      'A focused plan for people with a short list of problem items. We review all three bureau reports, file disputes on inaccurate entries each round, and keep you updated through your client dashboard and monthly check-ins.',
    bestFor: '1–5 negative items',
    timeline: 'Typically 2–4 months',
    features: [
      'Three-bureau report review',
      'Bureau disputes every 30–45 days',
      'Monthly progress summary',
      'Email support',
    ],
  },
  {
    id: 'accelerated',
    name: 'Accelerated',
    price: 119,
    setupFee: 0,
    blurb: 'Our most popular plan for collections and charge-offs.',
    description:
      'Everything in Essentials, plus direct creditor and collector intervention. We send debt-validation and goodwill letters, challenge unverifiable collections, and pair you with a dedicated advisor who coaches you on utilization and rebuilding.',
    bestFor: '5+ items, collections, or charge-offs',
    timeline: 'Typically 3–6 months',
    features: [
      'Everything in Essentials',
      'Creditor & collector letters',
      'Debt-validation requests',
      'Dedicated advisor + phone support',
      'Score-building coaching',
    ],
    featured: true,
  },
  {
    id: 'couples',
    name: 'Couples & Family',
    price: 179,
    setupFee: 0,
    blurb: 'Two credit files, one coordinated plan.',
    description:
      'Preparing for a mortgage together? We run two full Accelerated plans side by side and coordinate timing, so both applicants are in the strongest position when it’s time to apply.',
    bestFor: 'Joint mortgage or auto applicants',
    timeline: 'Typically 3–6 months',
    features: [
      'Two full Accelerated plans',
      'Joint goal & timeline planning',
      'Mortgage-readiness checklist',
      'Priority phone support',
    ],
  },
]

export default plans

export function findPlan(id: string) {
  return plans.find((plan) => plan.id === id)
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

/** Suggests a plan from a total severity weight of selected credit issues. */
export function recommendPlan(weight: number, joint: boolean): Plan {
  if (joint) return plans[2]
  return weight >= 4 ? plans[1] : plans[0]
}
