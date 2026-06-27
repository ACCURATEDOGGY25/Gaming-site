import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import TrustSection from '../components/TrustSection'
import BookingForm from '../components/BookingForm'
import services, { RUSH_FEE } from '../data/services'

const categories = ['All', ...new Set(services.map((s) => s.category))]

export default function Services() {
  const [category, setCategory] = useState('All')

  const filtered =
    category === 'All' ? services : services.filter((s) => s.category === category)

  return (
    <div>
      <section className="border-b border-surface-600 bg-gradient-to-b from-brand-500/10 to-surface-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
            <Zap className="h-3.5 w-3.5" />
            Highest-margin · Best long-term income
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            IT & Gaming Services
          </h1>
          <p className="mt-3 max-w-2xl text-gray-400">
            We sell outcomes, not jargon. Fixed packages with clear pricing, guarantees, and
            fast turnaround — for people who don&apos;t want to become IT people.
          </p>
          <p className="mt-2 text-sm text-brand-400">{RUSH_FEE}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                category === cat
                  ? 'bg-brand-500 text-surface-900'
                  : 'bg-surface-700 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-surface-600 bg-surface-800 p-8">
          <h2 className="font-display text-xl font-bold text-white">Not sure what you need?</h2>
          <p className="mt-2 text-sm text-gray-400">
            Tell us the problem — we&apos;ll recommend the right package within 2 hours.
          </p>
          <div className="mt-6">
            <BookingForm compact />
          </div>
        </div>
      </div>

      <TrustSection />
    </div>
  )
}
