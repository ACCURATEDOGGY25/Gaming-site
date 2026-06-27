import { calculateGamePrice } from './pricing'
import { getMagnetLink } from '../utils/gameLinks'

const games = [
  {
    id: 'mk1-classic',
    name: 'Mortal Kombat',
    subtitle: '1992 Arcade Classic',
    category: 'Fighting',
    year: 1992,
    graphicsTier: 1,
    fileSizeGB: 0.5,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    description: 'The original fighting classic. Pixel-perfect arcade action.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000001&dn=Mortal+Kombat+Classic&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'mkx',
    name: 'Mortal Kombat X',
    subtitle: 'Complete Edition',
    category: 'Fighting',
    year: 2015,
    graphicsTier: 3,
    fileSizeGB: 35,
    image: 'https://images.unsplash.com/photo-1614294148960-9aa814632a32?w=600&h=400&fit=crop',
    description: 'Fast kombat with cinematic X-Ray moves and online ladders.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000013&dn=Mortal+Kombat+X&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'mk11',
    name: 'Mortal Kombat 11',
    subtitle: 'Ultimate Edition',
    category: 'Fighting',
    year: 2019,
    graphicsTier: 4,
    fileSizeGB: 98,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85c1bdf?w=600&h=400&fit=crop',
    description: 'Cinematic 4K fighters, brutal fatalities, and online ranked play.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000002&dn=Mortal+Kombat+11&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'mk1-2023',
    name: 'Mortal Kombat 1',
    subtitle: '2023 Reboot',
    category: 'Fighting',
    year: 2023,
    graphicsTier: 5,
    fileSizeGB: 80,
    image: 'https://images.unsplash.com/photo-1614294148960-9aa814632a32?w=600&h=400&fit=crop',
    description: 'Reimagined timeline with UE5 visuals and new fatalities.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000011&dn=Mortal+Kombat+1+2023&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'tekken-8',
    name: 'Tekken 8',
    subtitle: 'Ultimate Edition',
    category: 'Fighting',
    year: 2024,
    graphicsTier: 5,
    fileSizeGB: 78,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    description: 'The heat system, new mechanics, and stunning Unreal Engine 5 visuals.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000014&dn=Tekken+8&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'fc22',
    name: 'EA Sports FC 22',
    subtitle: 'Formerly FIFA 22',
    category: 'Sports',
    year: 2021,
    graphicsTier: 3,
    fileSizeGB: 38,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
    description: 'HyperMotion technology and Volta street football.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000015&dn=EA+Sports+FC+22&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'fc23',
    name: 'EA Sports FC 24',
    subtitle: 'Formerly FIFA 23',
    category: 'Sports',
    year: 2023,
    graphicsTier: 4,
    fileSizeGB: 52,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
    description: 'HyperMotion gameplay with realistic stadium atmosphere.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000003&dn=EA+Sports+FC+24&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'fc25',
    name: 'EA Sports FC 25',
    subtitle: 'Annual Release',
    category: 'Sports',
    year: 2024,
    graphicsTier: 5,
    fileSizeGB: 68,
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop',
    description: 'FC 25 with improved AI, physics, and Ultimate Team.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000016&dn=EA+Sports+FC+25&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'fc26',
    name: 'EA Sports FC 26',
    subtitle: 'Next-Gen Football',
    category: 'Sports',
    year: 2025,
    graphicsTier: 6,
    fileSizeGB: 110,
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop',
    description: 'The latest FC with ray-traced crowds and 4K broadcast cameras.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000004&dn=EA+Sports+FC+26&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'nba2k25',
    name: 'NBA 2K25',
    subtitle: 'Hall of Fame Edition',
    category: 'Sports',
    year: 2024,
    graphicsTier: 5,
    fileSizeGB: 110,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop',
    description: 'ProPLAY technology and MyCAREER with ProPASS.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000017&dn=NBA+2K25&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'wwe2k24',
    name: 'WWE 2K24',
    subtitle: 'Forty Years of WrestleMania',
    category: 'Sports',
    year: 2024,
    graphicsTier: 4,
    fileSizeGB: 65,
    image: 'https://images.unsplash.com/photo-1555597673-b21d5da928ad?w=600&h=400&fit=crop',
    description: 'Showcase modes, creation suite, and full roster.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000018&dn=WWE+2K24&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'gta5',
    name: 'Grand Theft Auto V',
    subtitle: 'Enhanced Edition',
    category: 'Action',
    year: 2013,
    graphicsTier: 4,
    fileSizeGB: 72,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop',
    description: 'Open-world Los Santos with GTA Online included.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000005&dn=GTA+V&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'rdr2',
    name: 'Red Dead Redemption 2',
    subtitle: 'Complete Edition',
    category: 'Action',
    year: 2018,
    graphicsTier: 5,
    fileSizeGB: 120,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    description: 'Massive western open world with stunning detail.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000007&dn=Red+Dead+Redemption+2&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'gow-ragnarok',
    name: 'God of War Ragnarök',
    subtitle: 'PC Edition',
    category: 'Action',
    year: 2024,
    graphicsTier: 6,
    fileSizeGB: 95,
    image: 'https://images.unsplash.com/photo-1538488886553-4f40c61e2e2f?w=600&h=400&fit=crop',
    description: 'Kratos and Atreus face the Norse apocalypse in 4K.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000019&dn=God+of+War+Ragnarok&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'spiderman2',
    name: "Marvel's Spider-Man 2",
    subtitle: 'PC Port',
    category: 'Action',
    year: 2024,
    graphicsTier: 6,
    fileSizeGB: 98,
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=400&fit=crop',
    description: 'Swing through NYC with dual Spider-Men and ray tracing.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000010&dn=Spider-Man+2&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'ghost-tsushima',
    name: "Ghost of Tsushima",
    subtitle: "Director's Cut",
    category: 'Action',
    year: 2024,
    graphicsTier: 5,
    fileSizeGB: 68,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    description: 'Samurai open world on PC with Iki Island expansion.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000020&dn=Ghost+of+Tsushima&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'dmc5',
    name: 'Devil May Cry 5',
    subtitle: 'Special Edition',
    category: 'Action',
    year: 2019,
    graphicsTier: 4,
    fileSizeGB: 35,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=400&fit=crop',
    description: 'Stylish action with Nero, Dante, and V.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000021&dn=Devil+May+Cry+5&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    subtitle: 'Phantom Liberty',
    category: 'RPG',
    year: 2023,
    graphicsTier: 5,
    fileSizeGB: 85,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
    description: 'Night City at its finest with path tracing and DLSS.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000006&dn=Cyberpunk+2077&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    subtitle: 'Shadow of the Erdtree',
    category: 'RPG',
    year: 2024,
    graphicsTier: 5,
    fileSizeGB: 60,
    image: 'https://images.unsplash.com/photo-1538488886553-4f40c61e2e2f?w=600&h=400&fit=crop',
    description: 'FromSoftware masterpiece with vast open fields.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000008&dn=Elden+Ring&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    subtitle: 'Digital Deluxe',
    category: 'RPG',
    year: 2023,
    graphicsTier: 5,
    fileSizeGB: 122,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=400&fit=crop',
    description: 'CRPG epic with full voice acting and co-op.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000022&dn=Baldurs+Gate+3&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'witcher-3',
    name: 'The Witcher 3',
    subtitle: 'Complete Edition',
    category: 'RPG',
    year: 2015,
    graphicsTier: 3,
    fileSizeGB: 50,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    description: 'Next-gen update with ray tracing and all DLC.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000023&dn=The+Witcher+3&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'hogwarts-legacy',
    name: 'Hogwarts Legacy',
    subtitle: 'Deluxe Edition',
    category: 'RPG',
    year: 2023,
    graphicsTier: 5,
    fileSizeGB: 85,
    image: 'https://images.unsplash.com/photo-1538488886553-4f40c61e2e2f?w=600&h=400&fit=crop',
    description: 'Open-world wizarding adventure in the 1800s.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000024&dn=Hogwarts+Legacy&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'black-myth-wukong',
    name: 'Black Myth: Wukong',
    subtitle: 'Deluxe Edition',
    category: 'RPG',
    year: 2024,
    graphicsTier: 6,
    fileSizeGB: 130,
    image: 'https://images.unsplash.com/photo-1538488886553-4f40c61e2e2f?w=600&h=400&fit=crop',
    description: 'Unreal Engine 5 action RPG based on Journey to the West.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000025&dn=Black+Myth+Wukong&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'cod-mw3',
    name: 'Call of Duty: MW III',
    subtitle: 'Campaign + Multiplayer',
    category: 'Shooter',
    year: 2023,
    graphicsTier: 5,
    fileSizeGB: 95,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=400&fit=crop',
    description: 'Fast-paced modern warfare with cross-play.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000009&dn=Call+of+Duty+MW3&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'cod-bo6',
    name: 'Call of Duty: Black Ops 6',
    subtitle: 'Campaign + Zombies',
    category: 'Shooter',
    year: 2024,
    graphicsTier: 5,
    fileSizeGB: 102,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=400&fit=crop',
    description: 'Cold War conspiracy and round-based Zombies.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000026&dn=Call+of+Duty+BO6&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 're4-remake',
    name: 'Resident Evil 4 Remake',
    subtitle: 'Gold Edition',
    category: 'Horror',
    year: 2023,
    graphicsTier: 5,
    fileSizeGB: 58,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    description: 'Leon\'s village nightmare rebuilt in RE Engine.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000027&dn=Resident+Evil+4+Remake&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 're2-remake',
    name: 'Resident Evil 2 Remake',
    subtitle: 'Deluxe Edition',
    category: 'Horror',
    year: 2019,
    graphicsTier: 4,
    fileSizeGB: 26,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    description: 'Raccoon City survival horror reimagined.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000028&dn=Resident+Evil+2+Remake&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'forza-horizon5',
    name: 'Forza Horizon 5',
    subtitle: 'Premium Edition',
    category: 'Racing',
    year: 2021,
    graphicsTier: 5,
    fileSizeGB: 103,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    description: 'Mexico open-world racing with 4K HDR support.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000012&dn=Forza+Horizon+5&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'nfs-unbound',
    name: 'Need for Speed Unbound',
    subtitle: 'Palace Edition',
    category: 'Racing',
    year: 2022,
    graphicsTier: 4,
    fileSizeGB: 28,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    description: 'Street racing with graffiti-style visuals in Lakeshore.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000029&dn=NFS+Unbound&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'starfield',
    name: 'Starfield',
    subtitle: 'Premium Edition',
    category: 'RPG',
    year: 2023,
    graphicsTier: 5,
    fileSizeGB: 125,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
    description: 'Bethesda space RPG with 1000+ explorable planets.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000030&dn=Starfield&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'horizon-zero-dawn',
    name: 'Horizon Zero Dawn',
    subtitle: 'Complete Edition',
    category: 'Action',
    year: 2020,
    graphicsTier: 4,
    fileSizeGB: 48,
    image: 'https://images.unsplash.com/photo-1538488886553-4f40c61e2e2f?w=600&h=400&fit=crop',
    description: 'Aloy hunts robotic dinosaurs in a post-apocalyptic world.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000031&dn=Horizon+Zero+Dawn&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'ac-mirage',
    name: "Assassin's Creed Mirage",
    subtitle: 'Deluxe Edition',
    category: 'Action',
    year: 2023,
    graphicsTier: 4,
    fileSizeGB: 40,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    description: 'Return to stealth roots in golden-age Baghdad.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000032&dn=Assassins+Creed+Mirage&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    subtitle: 'Java Edition',
    category: 'Sandbox',
    year: 2011,
    graphicsTier: 2,
    fileSizeGB: 1,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    description: 'Build, explore, and survive in infinite block worlds.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000033&dn=Minecraft&tr=udp://tracker.opentrackr.org:1337',
  },
  {
    id: 'palworld',
    name: 'Palworld',
    subtitle: 'Early Access',
    category: 'Survival',
    year: 2024,
    graphicsTier: 4,
    fileSizeGB: 18,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    description: 'Creature collecting meets survival crafting and guns.',
    magnetLink:
      'magnet:?xt=urn:btih:0000000000000000000000000000000000000034&dn=Palworld&tr=udp://tracker.opentrackr.org:1337',
  },
]

function resolveGame(game) {
  return {
    ...game,
    magnetLink: getMagnetLink(game.id, game.magnetLink),
    price: calculateGamePrice(game.graphicsTier),
    type: 'game',
  }
}

export function getAllGames() {
  return games.map(resolveGame)
}

export function getGameById(id) {
  const game = games.find((g) => g.id === id)
  return game ? resolveGame(game) : undefined
}

export function sortGamesByPrice(order = 'asc') {
  return getAllGames().sort((a, b) =>
    order === 'asc' ? a.price - b.price : b.price - a.price
  )
}

export { games as rawGames }
export default getAllGames
