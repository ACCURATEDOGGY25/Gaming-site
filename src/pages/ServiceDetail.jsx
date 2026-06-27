import { useParams, Link, Navigate } from 'react-router-dom'
import { ShoppingCart, Check, Clock, Shield, ArrowLeft, Calendar } from 'lucide-react'
import { getServiceById } from '../data/services'
import { formatPrice } from '../data/pricing'
import { useCart } from '../context/CartContext'
import BookingForm from '../components/BookingForm'
import UpsellBanner from '../components/UpsellBanner'

export default function ServiceDetail() {
  const { id } = useParams()
  const service = getServiceById(id)
  const { addItem } = useCart()

  if (!service) return <Navigate to="/services" replace />

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/services"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        All Services
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-surface-600">
          <img src={service.image} alt={service.name} className="aspect-video w-full object-cover" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
            {service.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {service.name}
          </h1>
          <p className="text-lg text-gray-500">{service.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-700 px-3 py-1.5 text-sm text-gray-300">
              <Clock className="h-4 w-4 text-brand-400" />
              {service.turnaround}
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-700 px-3 py-1.5 text-sm text-gray-300">
              <Shield className="h-4 w-4 text-brand-400" />
              {service.guarantee}
            </span>
          </div>

          <p className="mt-6 text-gray-400 leading-relaxed">{service.description}</p>

          <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-wider text-brand-400">
            What&apos;s included
          </h3>
          <ul className="mt-3 space-y-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                <Check className="h-4 w-4 text-brand-400" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4">
            <div>
              <span className="font-display text-3xl font-bold text-brand-300">
                {formatPrice(service.price)}
              </span>
              {service.priceNote && (
                <span className="text-gray-500">{service.priceNote}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => addItem(service)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 py-3 font-bold text-surface-900 hover:bg-brand-400 sm:flex-none sm:px-8"
            >
              <ShoppingCart className="h-5 w-5" />
              Add & Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-surface-600 bg-surface-800 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-brand-400" />
            <h2 className="font-display text-lg font-bold text-white">Book This Service</h2>
          </div>
          <BookingForm preselectedService={service.id} compact />
        </div>

        {service.id !== 'svc-gaming-setup' && (
          <UpsellBanner
            title="Need a full gaming setup?"
            description="Upgrade to Game-Ready PC Setup — OS, drivers, 3 games installed, benchmark report."
            price={149}
            serviceId="svc-gaming-setup"
            cta="View package"
          />
        )}
      </div>
    </div>
  )
}
