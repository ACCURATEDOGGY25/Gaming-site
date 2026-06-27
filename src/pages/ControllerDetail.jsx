import { useParams, Link, Navigate } from 'react-router-dom'
import { ShoppingCart, Check, ArrowLeft, Truck } from 'lucide-react'
import { getControllerById } from '../data/controllers'
import { formatPrice } from '../data/pricing'
import { useCart } from '../context/CartContext'
import UpsellBanner from '../components/UpsellBanner'

export default function ControllerDetail() {
  const { id } = useParams()
  const controller = getControllerById(id)
  const { addItem } = useCart()

  if (!controller) return <Navigate to="/controllers" replace />

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/controllers"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Controllers
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-surface-600">
          <img
            src={controller.image}
            alt={controller.name}
            className="aspect-video w-full object-cover"
          />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
            {controller.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {controller.name}
          </h1>
          <p className="text-lg text-gray-500">{controller.subtitle}</p>

          {controller.inStock && (
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
              <Check className="h-4 w-4" />
              In Stock
            </span>
          )}

          <p className="mt-6 text-gray-400 leading-relaxed">{controller.description}</p>

          <ul className="mt-6 space-y-2">
            {controller.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                <Check className="h-4 w-4 text-brand-400" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-surface-600 bg-surface-800 p-4">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
            <div className="text-sm text-gray-400">
              <p className="font-semibold text-white">Free shipping on orders over $50</p>
              <p className="mt-1">Delivered in 3–5 business days</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-3xl font-bold text-brand-300">
              {formatPrice(controller.price)}
            </span>
            <button
              type="button"
              onClick={() => addItem(controller)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 py-3 font-bold text-surface-900 transition hover:bg-brand-400 sm:flex-none sm:px-8"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <UpsellBanner
          title="Add Controller Setup + Mapping — $25"
          description="We pair, map buttons for your games, and test it — plug in and play properly."
          price={25}
          serviceId="svc-controller-setup"
          cta="Add setup service"
        />
        <div className="rounded-xl border border-surface-600 bg-surface-800 p-5 text-center">
          <p className="text-sm text-gray-400">
            Buying for a fighter or racer? Check our{' '}
            <Link to="/bundles" className="font-semibold text-brand-400 hover:text-brand-300">
              curated bundles
            </Link>{' '}
            — controller + game + setup, save money.
          </p>
        </div>
      </div>
    </div>
  )
}
