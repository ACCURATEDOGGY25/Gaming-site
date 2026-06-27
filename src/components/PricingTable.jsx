import { GRAPHICS_TIERS } from '../data/pricing'

export default function PricingTable() {
  const tiers = Object.entries(GRAPHICS_TIERS)

  return (
    <div className="overflow-hidden rounded-xl border border-surface-600 bg-surface-800">
      <div className="border-b border-surface-600 px-5 py-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-400">
          Graphics-Based Pricing
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          Newer games with better graphics and larger files cost more. Classics stay affordable.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-600 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3">Tier</th>
              <th className="px-5 py-3">Quality</th>
              <th className="px-5 py-3">File Size</th>
              <th className="px-5 py-3">Example Price</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map(([tier, info]) => {
              const price = (4.99 * info.multiplier).toFixed(2)
              return (
                <tr
                  key={tier}
                  className="border-b border-surface-600/50 last:border-0 hover:bg-surface-700/50"
                >
                  <td className="px-5 py-3 font-semibold text-brand-300">Tier {tier}</td>
                  <td className="px-5 py-3 text-gray-300">
                    {info.label}
                    <span className="ml-2 text-gray-500">({info.description})</span>
                  </td>
                  <td className="px-5 py-3 text-gray-400">{info.sizeRange}</td>
                  <td className="px-5 py-3 font-display font-bold text-white">${price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
