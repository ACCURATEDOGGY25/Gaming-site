import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'
import BundleCard from '../components/BundleCard'
import getAllBundles from '../data/bundles'

export default function Bundles() {
  const bundles = getAllBundles()

  return (
    <div>
      <section className="border-b border-surface-600 bg-gradient-to-b from-brand-500/10 to-surface-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
            <Package className="h-3.5 w-3.5" />
            Game + Controller + Setup
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Curated Bundles
          </h1>
          <p className="mt-3 max-w-2xl text-gray-400">
            Save money and skip the hassle. Each bundle pairs the right hardware, games, and
            setup service — tested and ready to play.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-surface-600 bg-surface-800 p-8 text-center">
          <h2 className="font-display text-xl font-bold text-white">Want a custom bundle?</h2>
          <p className="mt-2 text-gray-400">
            Tell us your games and budget — we&apos;ll build a package with setup included.
          </p>
          <Link
            to="/book"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-bold text-surface-900 hover:bg-brand-400"
          >
            Request Custom Bundle
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
