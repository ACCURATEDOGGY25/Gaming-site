import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, Wrench } from 'lucide-react'
import { formatPrice } from '../data/pricing'
import { useCart } from '../context/CartContext'
import UpsellBanner from '../components/UpsellBanner'

const typeLabels = {
  game: 'Game',
  controller: 'Controller',
  service: 'Service',
  bundle: 'Bundle',
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <ShoppingBag className="mx-auto h-16 w-16 text-surface-600" />
        <h1 className="mt-6 font-display text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="mt-2 text-gray-400">Browse services, bundles, or gear to get started.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/services"
            className="rounded-lg bg-brand-500 px-6 py-3 font-bold text-surface-900 hover:bg-brand-400"
          >
            View Services
          </Link>
          <Link
            to="/bundles"
            className="rounded-lg border border-surface-600 px-6 py-3 font-semibold text-white hover:border-brand-500"
          >
            Shop Bundles
          </Link>
          <Link
            to="/controllers"
            className="rounded-lg border border-surface-600 px-6 py-3 font-semibold text-white hover:border-brand-500"
          >
            Controllers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">Shopping Cart</h1>
      <p className="mt-1 text-gray-400">{items.length} item(s)</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border border-surface-600 bg-surface-800 p-4"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-32 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-lg bg-surface-700">
                  <Wrench className="h-8 w-8 text-brand-400" />
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold uppercase text-brand-400">
                      {typeLabels[item.type] || item.type}
                    </span>
                    <h3 className="font-display font-bold text-white">{item.name}</h3>
                    {item.subtitle && (
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded p-1 text-gray-500 hover:bg-surface-700 hover:text-red-400"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded border border-surface-600 p-1 text-gray-400 hover:text-white"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded border border-surface-600 p-1 text-gray-400 hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-display font-bold text-brand-300">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {!items.some((i) => i.type === 'service') && (
            <UpsellBanner
              title="Add a setup service?"
              description="Most customers add Game Performance Optimization or Controller Setup at checkout."
              price={49}
              serviceId="svc-game-optimization"
              cta="Browse services"
              to="/services"
            />
          )}
        </div>

        <div className="h-fit rounded-xl border border-surface-600 bg-surface-800 p-6">
          <h2 className="font-display text-lg font-bold text-white">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax</span>
              <span>{formatPrice(total * 0.08)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-surface-600 pt-4">
            <span className="font-semibold text-white">Total</span>
            <span className="font-display text-xl font-bold text-brand-300">
              {formatPrice(total * 1.08)}
            </span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block w-full rounded-lg bg-brand-500 py-3 text-center font-bold text-surface-900 transition hover:bg-brand-400"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
