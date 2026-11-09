# Credit Repair Solutions

The marketing website for **Credit Repair Solutions**, a credit repair service that reviews clients' reports from all three bureaus, disputes inaccurate items, and coaches them on rebuilding credit.

## What's on the site

- **Landing page** (`/`): hero, at-a-glance stats, a four-step "how it works" section, an interactive 60-second credit check-up that suggests a plan, plans and pricing, a "what we can and can't do" section, an FAQ, and a free consultation form.
- **Plan detail pages** (`/plans/essentials`, `/plans/accelerated`, `/plans/couples`): full plan description, what's included, pricing sidebar, and the consultation form with that plan already selected.
- **Free consultation form**: handled by Netlify Forms. Submissions appear in the Netlify dashboard under **Forms → free-consultation**.

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19 (file-based routes, SSR)
- Tailwind CSS v4 (theme tokens in `src/styles.css`)
- Netlify Forms for lead capture
- Netlify Image CDN for responsive, WebP-optimized photography

## Running locally

```bash
pnpm install
netlify dev        # or: pnpm dev
pnpm test
```

Form submissions only work on a deployed Netlify site, or under `netlify dev`. A plain Vite dev server shows an error state when the form is submitted.

## Editing content

Most copy lives in two files:

- `src/data/site.ts`: business name, phone, hours, steps, FAQ, check-up issues, and form options
- `src/data/plans.ts`: plan names, prices, features, and the check-up recommendation logic

The phone number and email address are placeholders. Replace them before launch.
