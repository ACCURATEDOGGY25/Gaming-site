import { Link } from 'react-router-dom'
import { Check, Clock, ArrowRight, ShoppingCart } from 'lucide-react'
import { formatPrice } from '../data/pricing'
import { useCart } from '../context/CartContext'

export default function ServiceCard({ service, compact = false }) {
  const { addItem } = useCart()

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-xl border bg-surface-800 transition hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/10 ${
        service.popular ? 'border-brand-500/50 ring-1 ring-brand-500/20' : 'border-surface-600'
      }`}
    >
      {service.popular && (
        <div className="absolute right-0 top-0 rounded-bl-lg bg-brand-500 px-3 py-1 text-xs font-bold text-surface-900">
          Most Popular
        </div>
      )}

      {!compact && (
        <div className="aspect-video overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
          {service.category}
        </span>
        <h3 className="mt-1 font-display text-lg font-bold text-white">{service.name}</h3>
        <p className="text-sm text-gray-500">{service.tagline}</p>

        {!compact && (
          <p className="mt-3 flex-1 text-sm text-gray-400 line-clamp-2">{service.description}</p>
        )}

        <ul className="mt-4 space-y-1.5">
          {service.includes.slice(0, compact ? 3 : 4).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          {service.turnaround}
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-surface-600 pt-4">
          <div>
            <span className="font-display text-2xl font-bold text-brand-300">
              {formatPrice(service.price)}
            </span>
            {service.priceNote && (
              <span className="text-sm text-gray-500">{service.priceNote}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Link
              to={`/services/${service.id}`}
              className="rounded-lg border border-surface-600 px-3 py-2 text-xs font-semibold text-gray-300 hover:border-brand-500"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => addItem(service)}
              className="flex items-center gap-1 rounded-lg bg-brand-500 px-3 py-2 text-xs font-bold text-surface-900 hover:bg-brand-400"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Book
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
