import { ShoppingCart, HardDrive, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, getTierInfo } from '../data/pricing'
import { useCart } from '../context/CartContext'

export default function GameCard({ game }) {
  const { addItem } = useCart()
  const tier = getTierInfo(game.graphicsTier)

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-surface-600 bg-surface-800 transition hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/10">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.image}
          alt={game.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-surface-900/80 px-2.5 py-1 text-xs font-semibold text-brand-300 backdrop-blur">
          <Sparkles className="h-3 w-3" />
          Tier {game.graphicsTier} · {tier.label}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-surface-900/80 px-2.5 py-1 text-xs font-semibold text-gray-300 backdrop-blur">
          {game.year}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
          {game.category}
        </span>
        <h3 className="mt-1 font-display text-lg font-bold text-white">{game.name}</h3>
        <p className="text-sm text-gray-500">{game.subtitle}</p>
        <p className="mt-2 flex-1 text-sm text-gray-400 line-clamp-2">{game.description}</p>

        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <HardDrive className="h-3.5 w-3.5" />
            ~{game.fileSizeGB} GB
          </span>
          <span>{tier.sizeRange}</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-xl font-bold text-brand-300">
            {formatPrice(game.price)}
          </span>
          <div className="flex gap-2">
            <Link
              to={`/games/${game.id}`}
              className="rounded-lg border border-surface-600 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-brand-500 hover:text-white"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => addItem(game)}
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
