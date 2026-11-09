import { Link } from '@tanstack/react-router'
import { site } from '../data/site'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-semibold">
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-lime"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      </span>
      <span className="text-lg tracking-tight">{site.name}</span>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5">
      <Logo />
      <nav aria-label="Main" className="hidden items-center gap-8 text-sm font-medium md:flex">
        <a href="/#how" className="hover:underline">How it works</a>
        <a href="/#checkup" className="hover:underline">Check-up</a>
        <a href="/#plans" className="hover:underline">Plans</a>
        <a href="/#faq" className="hover:underline">FAQ</a>
      </nav>
      <div className="flex items-center gap-4">
        <a href={site.phoneHref} className="hidden text-sm font-semibold lg:inline">
          {site.phone}
        </a>
        <a href="/#consultation" className="action !py-2.5 !px-5 text-sm">
          Free review
        </a>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream/70 border-t border-cream/10">
      <div className="mx-auto max-w-7xl px-5 py-12 grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="text-cream">
          <p className="font-display text-2xl mb-2">{site.name}</p>
          <p className="text-sm text-cream/70">{site.tagline}</p>
          <p className="mt-4 text-sm">
            <a href={site.phoneHref} className="underline">{site.phone}</a>
            <br />
            <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
          </p>
        </div>
        <p className="text-xs leading-relaxed">
          Credit Repair Solutions is a credit services organization, not a law
          firm or lender. You have the right to dispute inaccurate information
          on your credit report directly with the credit bureaus at no cost.
          We do not guarantee any specific results or score changes, and we
          cannot remove accurate, timely, verifiable information. Under the
          Credit Repair Organizations Act, you may cancel your contract without
          penalty within three business days of signing, and we do not charge
          for any service before it has been fully performed. Plans and prices
          shown are subject to a written agreement.
          <br />
          <br />© {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
