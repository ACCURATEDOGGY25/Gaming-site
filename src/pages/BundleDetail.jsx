import { useParams, Link, Navigate } from 'react-router-dom'
import { ShoppingCart, Tag, ArrowLeft, Check } from 'lucide-react'
import { getBundleById } from '../data/bundles'
import { formatPrice } from '../data/pricing'
import { useCart } from '../context/CartContext'
import UpsellBanner from '../components/UpsellBanner'

export default function BundleDetail() {
  const { id } = useParams()
  const bundle = getBundleById(id)
  const { addItem } = useCart()

  if (!bundle) return <Navigate to="/bundles" replace />

  const handleAdd = () => {
    addItem({
      id: bundle.id,
      name: bundle.name,
      subtitle: bundle.tagline,
      price: bundle.price,
      type: 'bundle',
      image: bundle.image,
      bundleItems: bundle.items,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/bundles"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        All Bundles
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-surface-600">
          <img src={bundle.image} alt={bundle.name} className="aspect-video w-full object-cover" />
        </div>

        <div>
          <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-300">
            {bundle.badge}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            {bundle.name}
          </h1>
          <p className="text-lg text-gray-500">{bundle.tagline}</p>
          <p className="mt-4 text-gray-400 leading-relaxed">{bundle.description}</p>

          <div className="mt-6 flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-3">
            <Tag className="h-5 w-5 text-green-400" />
            <span className="text-sm font-semibold text-green-400">
              Save {formatPrice(bundle.savings)} vs buying separately
            </span>
          </div>

          <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-wider text-brand-400">
            Bundle includes
          </h3>
          <ul className="mt-3 space-y-2">
            {bundle.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-300">
                  <Check className="h-4 w-4 text-brand-400" />
                  {item.name}
                </span>
                <span className="text-gray-500">{formatPrice(item.price)}</span>
              </li>
            ))}
            <li className="flex items-center justify-between border-t border-surface-600 pt-2 text-sm">
              <span className="text-gray-500">Separate total</span>
              <span className="text-gray-500 line-through">{formatPrice(bundle.subtotal)}</span>
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-3xl font-bold text-brand-300">
              {formatPrice(bundle.price)}
            </span>
            <button
              type="button"
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 py-3 font-bold text-surface-900 hover:bg-brand-400 sm:flex-none sm:px-8"
            >
              <ShoppingCart className="h-5 w-5" />
              Add Bundle to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <UpsellBanner
          title="Need it installed on your PC too?"
          description="Add Game-Ready PC Setup if this is a new machine or first-time PC gamer."
          price={149}
          serviceId="svc-gaming-setup"
          cta="Add setup service"
        />
      </div>
    </div>
  )
}
