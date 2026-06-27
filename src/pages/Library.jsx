import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Download, Package, ExternalLink, ShoppingBag, Calendar } from 'lucide-react'
import { formatPrice } from '../data/pricing'
import { useOrders } from '../context/OrderContext'

function openInUtorrent(magnetLink) {
  window.location.href = magnetLink
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Library() {
  const { orders } = useOrders()
  const [expanded, setExpanded] = useState(null)

  const purchasedGames = useMemo(() => {
    const map = new Map()
    orders.forEach((order) => {
      order.items
        .filter((i) => i.type === 'game')
        .forEach((item) => {
          if (!map.has(item.id)) {
            map.set(item.id, { ...item, orderId: order.id, purchasedAt: order.date })
          }
        })
    })
    return Array.from(map.values())
  }, [orders])

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <ShoppingBag className="mx-auto h-16 w-16 text-surface-600" />
        <h1 className="mt-6 font-display text-2xl font-bold text-white">Your Library</h1>
        <p className="mt-2 text-gray-400">No purchases yet. Buy a game to see it here.</p>
        <Link
          to="/games"
          className="mt-8 inline-block rounded-lg bg-brand-500 px-6 py-3 font-bold text-surface-900 hover:bg-brand-400"
        >
          Browse Games
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">Your Library</h1>
      <p className="mt-2 text-gray-400">
        Re-download your purchased games anytime — opens in uTorrent
      </p>

      {purchasedGames.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-bold text-white">My Games</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {purchasedGames.map((game) => (
              <div
                key={game.id}
                className="rounded-xl border border-surface-600 bg-surface-800 p-5"
              >
                <h3 className="font-display font-bold text-white">{game.name}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Purchased {formatDate(game.purchasedAt)}
                </p>
                <button
                  type="button"
                  onClick={() => openInUtorrent(game.magnetLink)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-sm font-bold text-surface-900 hover:bg-brand-400"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in uTorrent
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-display text-lg font-bold text-white">Order History</h2>
        <div className="mt-4 space-y-3">
          {orders.map((order) => {
            const isOpen = expanded === order.id
            const games = order.items.filter((i) => i.type === 'game')
            const controllers = order.items.filter((i) => i.type === 'controller')

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-xl border border-surface-600 bg-surface-800"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : order.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-surface-700/50"
                >
                  <div>
                    <p className="font-mono text-sm text-brand-300">{order.id}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-white">
                      {formatPrice(order.total * 1.08)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.items.length} item(s)
                    </p>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-surface-600 px-5 pb-5">
                    {games.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-brand-400">
                          <Download className="h-3.5 w-3.5" />
                          Downloads
                        </p>
                        <ul className="space-y-2">
                          {games.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-center justify-between gap-3 rounded-lg bg-surface-700 p-3"
                            >
                              <span className="text-sm text-white">{item.name}</span>
                              <button
                                type="button"
                                onClick={() => openInUtorrent(item.magnetLink)}
                                className="shrink-0 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-bold text-surface-900 hover:bg-brand-400"
                              >
                                uTorrent
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {controllers.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-brand-400">
                          <Package className="h-3.5 w-3.5" />
                          Controllers
                        </p>
                        <ul className="space-y-1 text-sm text-gray-400">
                          {controllers.map((item) => (
                            <li key={item.id}>
                              {item.name} × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      to={`/order/${order.id}`}
                      className="mt-4 inline-block text-xs font-semibold text-brand-400 hover:text-brand-300"
                    >
                      View full receipt →
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
