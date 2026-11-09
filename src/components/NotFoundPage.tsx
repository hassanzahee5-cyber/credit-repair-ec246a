import { Link } from '@tanstack/react-router'
import { SiteHeader } from './SiteChrome'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="font-display text-7xl mb-4">404</p>
        <h1 className="text-2xl font-semibold mb-4">Page not found</h1>
        <p className="mb-8 text-muted">
          This page isn’t here — but your free credit review still is.
        </p>
        <Link to="/" className="action">
          Back to home
        </Link>
      </main>
    </div>
  )
}
