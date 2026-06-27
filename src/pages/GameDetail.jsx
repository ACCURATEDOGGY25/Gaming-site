import { useParams, Link, Navigate } from 'react-router-dom'
import { ShoppingCart, HardDrive, Calendar, Download, ArrowLeft, Sparkles } from 'lucide-react'
import { getGameById } from '../data/games'
import { formatPrice, getTierInfo } from '../data/pricing'
import { useCart } from '../context/CartContext'
import UpsellBanner from '../components/UpsellBanner'

export default function GameDetail() {
  const { id } = useParams()
  const game = getGameById(id)
  const { addItem } = useCart()

  if (!game) return <Navigate to="/games" replace />

  const tier = getTierInfo(game.graphicsTier)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/games"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Games
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-surface-600">
          <img src={game.image} alt={game.name} className="aspect-video w-full object-cover" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
            {game.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {game.name}
          </h1>
          <p className="text-lg text-gray-500">{game.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-700 px-3 py-1.5 text-sm text-gray-300">
              <Sparkles className="h-4 w-4 text-brand-400" />
              Tier {game.graphicsTier} — {tier.label}
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-700 px-3 py-1.5 text-sm text-gray-300">
              <HardDrive className="h-4 w-4 text-brand-400" />
              ~{game.fileSizeGB} GB
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-700 px-3 py-1.5 text-sm text-gray-300">
              <Calendar className="h-4 w-4 text-brand-400" />
              {game.year}
            </span>
          </div>

          <p className="mt-6 text-gray-400 leading-relaxed">{game.description}</p>

          <div className="mt-6 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
            <div className="flex items-start gap-3">
              <Download className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <div className="text-sm text-gray-400">
                <p className="font-semibold text-brand-300">uTorrent Download</p>
                <p className="mt-1">
                  After purchase, click the download button on your order page. It will open
                  uTorrent automatically with the magnet link for this game.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-3xl font-bold text-brand-300">
              {formatPrice(game.price)}
            </span>
            <button
              type="button"
              onClick={() => addItem(game)}
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
          title="Want this running smoothly on your PC?"
          description="Book Game Performance Optimization — we tune settings, drivers, and background apps remotely."
          price={49}
          serviceId="svc-game-optimization"
          cta="Add optimization — $49"
        />
        <UpsellBanner
          title="New to PC gaming?"
          description="Game-Ready PC Setup — we install everything, pair your controller, and test 3 games."
          price={149}
          serviceId="svc-gaming-setup"
          cta="View full setup — $149"
        />
      </div>
    </div>
  )
}
