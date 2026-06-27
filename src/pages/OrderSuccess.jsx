import { useParams, Link, Navigate } from 'react-router-dom'
import { CheckCircle, Download, Package, ExternalLink, Wrench, Calendar } from 'lucide-react'
import { formatPrice } from '../data/pricing'
import { useOrders } from '../context/OrderContext'
import { RESPONSE_TIME } from '../data/services'

function openInUtorrent(magnetLink) {
  window.location.href = magnetLink
}

function collectGamesFromOrder(order) {
  const games = []
  order.items.forEach((item) => {
    if (item.type === 'game') games.push(item)
    if (item.type === 'bundle' && item.bundleItems) {
      item.bundleItems
        .filter((bi) => bi.type === 'game')
        .forEach((bi) => games.push({ ...bi, quantity: item.quantity }))
    }
  })
  return games
}

export default function OrderSuccess() {
  const { id } = useParams()
  const { getOrder } = useOrders()
  const order = getOrder(id)

  if (!order) return <Navigate to="/" replace />

  const gameItems = collectGamesFromOrder(order)
  const controllerItems = order.items.filter((i) => i.type === 'controller')
  const serviceItems = order.items.filter((i) => i.type === 'service')
  const bundleItems = order.items.filter((i) => i.type === 'bundle')

  const bundleServices = bundleItems.flatMap((b) =>
    (b.bundleItems || []).filter((bi) => bi.type === 'service')
  )
  const bundleControllers = bundleItems.flatMap((b) =>
    (b.bundleItems || []).filter((bi) => bi.type === 'controller')
  )

  const allServices = [...serviceItems, ...bundleServices]
  const allControllers = [...controllerItems, ...bundleControllers]

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
        <h1 className="mt-6 font-display text-3xl font-bold text-white">Order Confirmed!</h1>
        <p className="mt-2 text-gray-400">
          Order <span className="font-mono text-brand-300">{order.id}</span> — paid{' '}
          {formatPrice(order.total * 1.08)}
        </p>
      </div>

      {allServices.length > 0 && (
        <div className="mt-10 rounded-xl border border-brand-500/30 bg-brand-500/5 p-6">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-brand-400" />
            <h2 className="font-display text-lg font-bold text-white">Service Booking</h2>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            {RESPONSE_TIME}. We&apos;ll contact you to schedule your appointment.
          </p>
          <ul className="mt-4 space-y-2">
            {allServices.map((item, idx) => (
              <li key={`${item.id}-${idx}`} className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar className="h-4 w-4 text-brand-400" />
                {item.name} — scheduling pending
              </li>
            ))}
          </ul>
          <Link
            to="/book"
            className="mt-4 inline-block text-sm font-semibold text-brand-400 hover:text-brand-300"
          >
            Or confirm a time now →
          </Link>
        </div>
      )}

      {gameItems.length > 0 && (
        <div className="mt-6 rounded-xl border border-surface-600 bg-surface-800 p-6">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-brand-400" />
            <h2 className="font-display text-lg font-bold text-white">Your Game Downloads</h2>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Click to open in uTorrent. Make sure uTorrent is installed.
          </p>
          <ul className="mt-6 space-y-3">
            {gameItems.map((item, idx) => (
              <li
                key={`${item.id}-${idx}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-surface-600 bg-surface-700 p-4"
              >
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-gray-500">Magnet link ready</p>
                </div>
                <button
                  type="button"
                  onClick={() => openInUtorrent(item.magnetLink)}
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-surface-900 hover:bg-brand-400"
                >
                  <ExternalLink className="h-4 w-4" />
                  uTorrent
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {allControllers.length > 0 && (
        <div className="mt-6 rounded-xl border border-surface-600 bg-surface-800 p-6">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-brand-400" />
            <h2 className="font-display text-lg font-bold text-white">Controller Shipping</h2>
          </div>
          <ul className="mt-4 space-y-2">
            {allControllers.map((item, idx) => (
              <li key={`${item.id}-${idx}`} className="text-sm text-gray-400">
                {item.name} — shipping in 3–5 business days
              </li>
            ))}
          </ul>
        </div>
      )}

      {bundleItems.length > 0 && (
        <div className="mt-6 rounded-xl border border-surface-600 bg-surface-800 p-6">
          <h2 className="font-display text-lg font-bold text-white">Bundles Purchased</h2>
          <ul className="mt-4 space-y-2">
            {bundleItems.map((item) => (
              <li key={item.id} className="text-sm text-gray-400">
                {item.name} — all items included above
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/library"
          className="rounded-lg bg-brand-500 px-6 py-3 font-bold text-surface-900 hover:bg-brand-400"
        >
          Go to My Library
        </Link>
        <Link
          to="/services"
          className="rounded-lg border border-surface-600 px-6 py-3 font-semibold text-white hover:border-brand-500"
        >
          Browse Services
        </Link>
      </div>
    </div>
  )
}
