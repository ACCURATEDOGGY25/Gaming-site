import { Link } from 'react-router-dom'
import { ArrowRight, Wrench } from 'lucide-react'
import { formatPrice } from '../data/pricing'

export default function UpsellBanner({
  title,
  description,
  price,
  serviceId = 'svc-game-optimization',
  cta = 'Add to cart',
  to,
}) {
  const linkTo = to || `/services/${serviceId}`

  return (
    <div className="rounded-xl border border-brand-500/30 bg-gradient-to-r from-brand-500/10 to-surface-800 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/20">
          <Wrench className="h-5 w-5 text-brand-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-400">{description}</p>
          {price && (
            <p className="mt-2 font-display text-lg font-bold text-brand-300">
              {formatPrice(price)}
            </p>
          )}
        </div>
        <Link
          to={linkTo}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-bold text-surface-900 hover:bg-brand-400"
        >
          {cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
