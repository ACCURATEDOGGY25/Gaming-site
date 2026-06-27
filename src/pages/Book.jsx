import BookingForm from '../components/BookingForm'
import TrustSection from '../components/TrustSection'
import { SERVICE_AREA, RESPONSE_TIME, RUSH_FEE } from '../data/services'
import { Clock, MapPin, Zap } from 'lucide-react'

export default function Book() {
  return (
    <div>
      <section className="border-b border-surface-600 bg-gradient-to-b from-brand-500/10 to-surface-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Book a Service
          </h1>
          <p className="mt-3 max-w-2xl text-gray-400">
            No vague &quot;contact me&quot; — tell us what you need and we&apos;ll confirm within
            2 hours with a time slot.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-400" />
              {RESPONSE_TIME}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-400" />
              {SERVICE_AREA}
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-brand-400" />
              {RUSH_FEE}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-xl border border-surface-600 bg-surface-800 p-8">
          <BookingForm />
        </div>
      </div>

      <TrustSection compact />
    </div>
  )
}
