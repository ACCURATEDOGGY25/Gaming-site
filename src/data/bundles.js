import { getGameById } from './games'
import { getServiceById } from './services'
import { getControllerById } from './controllers'

const bundleDefs = [
  {
    id: 'bundle-mk-starter',
    name: 'Mortal Kombat Starter Pack',
    tagline: 'Fight stick + game + pro setup',
    description:
      'Everything to go from zero to fatalities. Fight stick, MK11, and we configure it all for you.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    gameId: 'mk11',
    controllerId: 'ctrl-fight-stick',
    serviceId: 'svc-controller-setup',
    savings: 15,
    badge: 'Best for fighters',
  },
  {
    id: 'bundle-fc-football',
    name: 'FC Football Bundle',
    tagline: 'Controller + latest FC + optimization',
    description:
      'Wireless pro controller, EA Sports FC, and a performance tune so online matches feel smooth.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
    gameId: 'fc26',
    controllerId: 'ctrl-wireless-pro',
    serviceId: 'svc-game-optimization',
    savings: 20,
    badge: 'Most popular',
  },
  {
    id: 'bundle-gaming-starter',
    name: 'Gaming PC Starter',
    tagline: 'Controller + 2 games + full setup',
    description:
      'Switching to PC gaming? Elite controller, two curated titles, and our full game-ready setup service.',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&h=400&fit=crop',
    gameId: 'elden-ring',
    secondGameId: 'forza-horizon5',
    controllerId: 'ctrl-elite',
    serviceId: 'svc-gaming-setup',
    savings: 35,
    badge: 'Console → PC',
  },
  {
    id: 'bundle-racing',
    name: 'Sim Racing Bundle',
    tagline: 'Wheel + Forza + tuning session',
    description:
      'Force feedback wheel, Forza Horizon 5, and a remote session to dial in your driving settings.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    gameId: 'forza-horizon5',
    controllerId: 'ctrl-racing-wheel',
    serviceId: 'svc-game-optimization',
    savings: 25,
    badge: 'Racing fans',
  },
  {
    id: 'bundle-birthday',
    name: 'Birthday Gamer Bundle',
    tagline: 'Gift-ready controller + game + wrap',
    description:
      'Wireless controller, Minecraft, controller setup, and gift packaging — ready to hand over.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    gameId: 'minecraft',
    controllerId: 'ctrl-wireless-pro',
    serviceId: 'svc-controller-setup',
    savings: 12,
    badge: 'Gift package',
  },
]

export function resolveBundle(def) {
  const game = getGameById(def.gameId)
  const secondGame = def.secondGameId ? getGameById(def.secondGameId) : null
  const controller = getControllerById(def.controllerId)
  const serviceData = getServiceById(def.serviceId)
  const servicePrice = serviceData?.price ?? 25
  const items = [game, controller]
  if (secondGame) items.push(secondGame)

  const subtotal = items.reduce((sum, i) => sum + i.price, 0) + servicePrice
  const bundlePrice = Math.round((subtotal - def.savings) * 100) / 100

  return {
    ...def,
    type: 'bundle',
    game,
    secondGame,
    controller,
    serviceId: def.serviceId,
    serviceName: serviceData?.name ?? 'Setup Service',
    servicePrice,
    subtotal,
    price: bundlePrice,
    savings: def.savings,
    items: [
      ...items.map((i) => ({ id: i.id, name: i.name, price: i.price, type: i.type })),
      {
        id: def.serviceId,
        name: serviceData?.name ?? 'Setup Service',
        price: servicePrice,
        type: 'service',
      },
    ],
  }
}

export function getAllBundles() {
  return bundleDefs.map(resolveBundle)
}

export function getBundleById(id) {
  const def = bundleDefs.find((b) => b.id === id)
  return def ? resolveBundle(def) : undefined
}

export default getAllBundles
