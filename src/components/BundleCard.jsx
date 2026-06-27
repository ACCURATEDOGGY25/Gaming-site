import { Link } from 'react-router-dom'
import { ShoppingCart, Tag, ArrowRight } from 'lucide-react'
import { formatPrice } from '../data/pricing'
import { useCart } from '../context/CartContext'

export default function BundleCard({ bundle }) {
  const { addItem } = useCart()

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
    <article className="group flex flex-col overflow-hidden rounded-xl border border-surface-600 bg-surface-800 transition hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/10">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={bundle.image}
          alt={bundle.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-brand-500 px-2.5 py-1 text-xs font-bold text-surface-900">
          {bundle.badge}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500/20 px-2.5 py-1 text-xs font-semibold text-green-400 backdrop-blur">
          <Tag className="h-3 w-3" />
          Save {formatPrice(bundle.savings)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-white">{bundle.name}</h3>
        <p className="text-sm text-gray-500">{bundle.tagline}</p>
        <p className="mt-2 flex-1 text-sm text-gray-400 line-clamp-2">{bundle.description}</p>

        <ul className="mt-3 space-y-1 text-xs text-gray-500">
          <li>• {bundle.game?.name}</li>
          {bundle.secondGame && <li>• {bundle.secondGame.name}</li>}
          <li>• {bundle.controller?.name}</li>
          <li>• {bundle.serviceName}</li>
        </ul>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(bundle.subtotal)}
            </span>
            <span className="ml-2 font-display text-xl font-bold text-brand-300">
              {formatPrice(bundle.price)}
            </span>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/bundles/${bundle.id}`}
              className="rounded-lg border border-surface-600 px-3 py-2 text-xs font-semibold text-gray-300 hover:border-brand-500"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-1 rounded-lg bg-brand-500 px-3 py-2 text-xs font-bold text-surface-900 hover:bg-brand-400"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
