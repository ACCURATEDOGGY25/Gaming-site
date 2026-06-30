import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import GameCard from '../components/GameCard'
import UpsellBanner from '../components/UpsellBanner'
import getAllGames from '../data/games'

const categories = ['All', ...new Set(getAllGames().map((g) => g.category))]

export default function Games() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('tier-desc')

  const filtered = useMemo(() => {
    const allGames = getAllGames()
    let result = [...allGames]

    if (category !== 'All') {
      result = result.filter((g) => g.category === category)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.subtitle.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'tier-asc':
        result.sort((a, b) => a.graphicsTier - b.graphicsTier)
        break
      case 'tier-desc':
      default:
        result.sort((a, b) => b.graphicsTier - a.graphicsTier)
        break
    }

    return result
  }, [search, category, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Game Catalog</h1>
        <p className="mt-2 max-w-2xl text-gray-400">
          Curated picks to bring you here — prices scale with graphics quality. Add a setup
          service on any game page so it actually runs great on your PC.
        </p>
      </div>

      <div className="mb-8">
        <UpsellBanner
          title="Buying a game? Add optimization."
          description="Most customers add a $49 performance tune so games run smooth on their PC — remote, same day."
          price={49}
          serviceId="svc-game-optimization"
          cta="Add optimization service"
        />
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-surface-600 bg-surface-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                category === cat
                  ? 'bg-brand-500 text-surface-900'
                  : 'bg-surface-700 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none rounded-lg border border-surface-600 bg-surface-800 py-2.5 pl-10 pr-8 text-sm text-white outline-none focus:border-brand-500"
          >
            <option value="tier-desc">Graphics: High → Low</option>
            <option value="tier-asc">Graphics: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="price-asc">Price: Low → High</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-gray-500">No games match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
