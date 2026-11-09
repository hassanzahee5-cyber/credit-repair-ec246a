export const site = {
  name: 'Credit Repair Solutions',
  shortName: 'CRS',
  tagline: 'Honest credit repair, one dispute at a time.',
  description:
    'Credit Repair Solutions reviews your reports from all three bureaus, disputes inaccurate items, and coaches you toward a stronger score. Free consultation, no upfront fees.',
  phone: '(800) 555-0142',
  phoneHref: 'tel:+18005550142',
  email: 'hello@creditrepairsolutions.example',
  hours: 'Mon–Fri, 8am–7pm ET · Sat, 9am–1pm ET',
}

export const stats = [
  { value: '3', label: 'bureaus reviewed line by line' },
  { value: '$0', label: 'charged before work is done' },
  { value: '30 days', label: 'typical bureau response window' },
  { value: 'Cancel', label: 'any time, no contracts' },
]

export const steps = [
  {
    title: 'Free credit review',
    description:
      'We pull your Experian, Equifax, and TransUnion reports together and walk through every account, inquiry, and public record with you.',
  },
  {
    title: 'Custom dispute plan',
    description:
      'You approve a written plan that targets items that look inaccurate, incomplete, outdated, or unverifiable — nothing filed without your sign-off.',
  },
  {
    title: 'Disputes & creditor letters',
    description:
      'We prepare and send bureau disputes, goodwill requests, and debt-validation letters, then track every response for you.',
  },
  {
    title: 'Rebuild & monitor',
    description:
      'Alongside disputes, we coach you on utilization, payment history, and new positive credit so improvements stick.',
  },
]

export const promises = {
  can: [
    'Dispute items that are inaccurate, incomplete, or unverifiable',
    'Request validation from collectors under the FDCPA',
    'Send goodwill and pay-for-delete requests to creditors',
    'Coach you on utilization, budgeting, and rebuilding',
    'Charge only after services for that month are performed',
  ],
  cannot: [
    'Remove accurate, timely negative information',
    'Guarantee a specific score or deletion',
    'Create a “new” credit identity (that’s illegal)',
    'Do anything you can’t legally do yourself for free',
  ],
}

export const issues = [
  { id: 'late', label: 'Late payments', weight: 2 },
  { id: 'collections', label: 'Collection accounts', weight: 3 },
  { id: 'chargeoffs', label: 'Charge-offs', weight: 3 },
  { id: 'inquiries', label: 'Too many hard inquiries', weight: 1 },
  { id: 'errors', label: 'Accounts I don’t recognize', weight: 2 },
  { id: 'utilization', label: 'High card balances', weight: 1 },
  { id: 'public', label: 'Bankruptcy or judgment', weight: 4 },
  { id: 'medical', label: 'Medical bills', weight: 2 },
] as const

export const faqs = [
  {
    q: 'Is credit repair legal?',
    a: 'Yes. The Fair Credit Reporting Act gives you the right to dispute information you believe is inaccurate, and the Credit Repair Organizations Act lets you hire a company to help. Reputable firms must give you a written contract, a three-day cancellation window, and may not charge before services are performed.',
  },
  {
    q: 'How long does it take?',
    a: 'Bureaus usually respond to a dispute within 30 days (up to 45 in some cases). Most clients work with us for three to six months, depending on how many items are being addressed and how creditors respond.',
  },
  {
    q: 'Can you guarantee my score will go up?',
    a: 'No — and you should be wary of anyone who does. We can only dispute items that appear inaccurate, incomplete, or unverifiable. Results depend on your reports and on how bureaus and creditors respond.',
  },
  {
    q: 'Will this hurt my credit?',
    a: 'Disputing items does not lower your score, and our review uses a soft pull that has no effect on your credit.',
  },
  {
    q: 'Couldn’t I do this myself?',
    a: 'Absolutely — you can dispute items with the bureaus for free. Clients hire us for the time saved, the organized paper trail, and experience with what to send, when, and to whom.',
  },
]

export const consultationForm = {
  name: 'free-consultation',
  endpoint: '/__forms.html',
}

export const scoreRanges = [
  'Not sure',
  'Below 550',
  '550–619',
  '620–679',
  '680–739',
  '740+',
]

export const goals = [
  'Buy a home',
  'Buy or lease a car',
  'Rent an apartment',
  'Lower my interest rates',
  'Fix errors on my report',
  'General financial health',
]
