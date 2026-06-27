import { ShoppingCart, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/pricing'
import { useCart } from '../context/CartContext'

export default function ControllerCard({ controller }) {
  const { addItem } = useCart()

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-surface-600 bg-surface-800 transition hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/10">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={controller.image}
          alt={controller.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-brand-500/90 px-2.5 py-1 text-xs font-bold text-surface-900">
          {controller.category}
        </div>
        {controller.inStock && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500/20 px-2.5 py-1 text-xs font-semibold text-green-400 backdrop-blur">
            <Check className="h-3 w-3" />
            In Stock
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-white">{controller.name}</h3>
        <p className="text-sm text-gray-500">{controller.subtitle}</p>
        <p className="mt-2 flex-1 text-sm text-gray-400 line-clamp-2">
          {controller.description}
        </p>

        <ul className="mt-3 space-y-1">
          {controller.features.slice(0, 2).map((f) => (
            <li key={f} className="text-xs text-gray-500">
              • {f}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-xl font-bold text-brand-300">
            {formatPrice(controller.price)}
          </span>
          <div className="flex gap-2">
            <Link
              to={`/controllers/${controller.id}`}
              className="rounded-lg border border-surface-600 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-brand-500 hover:text-white"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => addItem(controller)}
              className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-xs font-bold text-surface-900 transition hover:bg-brand-400"
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
