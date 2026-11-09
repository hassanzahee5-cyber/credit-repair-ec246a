# Credit Repair Solutions — agent notes

Marketing + lead-capture site for a credit repair business. TanStack Start (React 19, SSR) on Netlify, Tailwind v4. There are no accounts, no database, and no payments.

## Layout

- `src/routes/index.tsx` → `components/MarketingPage.tsx`: the whole landing page. Section ids are `how`, `checkup`, `plans`, `faq`, and `consultation`, and the header nav links to them.
- `src/routes/plans/$planId.tsx` → `components/PlanPage.tsx`: plan detail. Unknown ids throw `notFound()`.
- `components/ConsultationForm.tsx`: Netlify Forms AJAX submission to `/__forms.html`. It rejects non-2xx responses and the unchanged registration HTML, so a local preview isn't mistaken for success.
- `components/CreditCheckup.tsx`: client-side issue picker. It calls `recommendPlan()` in `data/plans.ts` and lifts the plan and issue labels to the page, which passes them into the form as the `plan-id`, `plan-name`, and `issues` fields.
- `components/SiteChrome.tsx`: Logo, SiteHeader, and SiteFooter (the footer holds the CROA/FCRA legal disclaimer).
- `components/ScoreGauge.tsx`: illustrative SVG gauge.
- `src/data/site.ts` and `src/data/plans.ts`: all copy and config.
- `public/__forms.html`: static registration for the `free-consultation` form. **Every field the React form submits must be listed here** (form-name, subject, plan-id, plan-name, issues, name, email, phone, score-range, goal, message, consent, bot-field).
- `public/img/`: AI-generated photography. Always reference it through `/.netlify/images?url=/img/<file>&w=<w>&fm=webp`.

## Conventions and decisions

- Compliance tone matters: credit repair is regulated (CROA, FTC). Never add copy that guarantees results or score increases, promises removal of accurate items, or implies upfront fees. Keep the illustrative mockups labelled "Illustration only".
- Theme colors (`ink`, `cream`, `paper`, `lime`, `clay`, `muted`) and fonts (Fraunces display, Inter Tight body) are defined in `@theme` in `src/styles.css`. Fonts load from Google Fonts in `__root.tsx`.
- Shared button classes: `.action`, `.action-lime`, and `.action-ghost`. Form classes: `.form-input` and `.form-label`.
- The phone number and email in `site.ts` are placeholders.
- TypeScript stays on v6 because the Netlify adapter tooling needs it.
