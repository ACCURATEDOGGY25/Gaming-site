import { Star, Shield, Clock, MapPin } from 'lucide-react'
import { testimonials, trustBadges } from '../data/testimonials'
import { SERVICE_AREA, RESPONSE_TIME } from '../data/services'

export default function TrustSection({ compact = false }) {
  return (
    <section className={compact ? '' : 'border-y border-surface-600 bg-surface-800/50'}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${compact ? 'py-8' : 'py-16'}`}>
        {!compact && (
          <>
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trustBadges.map(({ label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-xl border border-surface-600 bg-surface-800 p-4"
                >
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <div>
                    <p className="font-semibold text-white">{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-10 flex flex-wrap gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-400" />
                {SERVICE_AREA}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-400" />
                {RESPONSE_TIME}
              </span>
            </div>
          </>
        )}

        <h2 className="mb-6 font-display text-xl font-bold text-white sm:text-2xl">
          What customers say
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="rounded-xl border border-surface-600 bg-surface-800 p-5"
            >
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-3">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
