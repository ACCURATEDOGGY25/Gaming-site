export const GRAPHICS_TIERS = {
  1: { label: 'Classic', description: 'Retro / low-res', sizeRange: '2–8 GB', multiplier: 1 },
  2: { label: 'Standard', description: '720p era', sizeRange: '8–20 GB', multiplier: 1.4 },
  3: { label: 'HD', description: '1080p', sizeRange: '20–35 GB', multiplier: 1.8 },
  4: { label: 'High', description: '1080p enhanced', sizeRange: '35–55 GB', multiplier: 2.4 },
  5: { label: 'Ultra', description: '4K ready', sizeRange: '55–80 GB', multiplier: 3.2 },
  6: { label: 'Next-Gen', description: '4K / ray tracing', sizeRange: '80–120 GB', multiplier: 4.5 },
}

const BASE_GAME_PRICE = 4.99

export function calculateGamePrice(graphicsTier) {
  const tier = GRAPHICS_TIERS[graphicsTier] ?? GRAPHICS_TIERS[3]
  return Math.round(BASE_GAME_PRICE * tier.multiplier * 100) / 100
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function getTierInfo(tier) {
  return GRAPHICS_TIERS[tier] ?? GRAPHICS_TIERS[3]
}
