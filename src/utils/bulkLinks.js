/**
 * Parse bulk paste text into game ID → magnet link map.
 * Supports formats:
 *   mk11 | magnet:?xt=...
 *   Mortal Kombat 11: magnet:?xt=...
 *   fc26,magnet:?xt=...
 *   {"mk11": "magnet:..."}  (JSON)
 */
export function parseBulkLinks(text, games) {
  const trimmed = text.trim()
  if (!trimmed) return {}

  if (trimmed.startsWith('{')) {
    const parsed = JSON.parse(trimmed)
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Invalid JSON object')
    }
    return parsed
  }

  const result = {}
  const lines = trimmed.split('\n').filter((l) => l.trim())

  const gameById = Object.fromEntries(games.map((g) => [g.id.toLowerCase(), g.id]))
  const gameByName = Object.fromEntries(
    games.map((g) => [g.name.toLowerCase(), g.id])
  )

  for (const line of lines) {
    let gameKey = null
    let magnet = null

    if (line.includes('|')) {
      const [left, ...rest] = line.split('|')
      gameKey = left.trim()
      magnet = rest.join('|').trim()
    } else if (line.includes(':') && line.indexOf('magnet:') > line.indexOf(':')) {
      const colonIdx = line.indexOf(':')
      gameKey = line.slice(0, colonIdx).trim()
      magnet = line.slice(colonIdx + 1).trim()
    } else if (line.includes(',')) {
      const [left, ...rest] = line.split(',')
      gameKey = left.trim()
      magnet = rest.join(',').trim()
    } else if (line.startsWith('magnet:')) {
      continue
    }

    if (!gameKey || !magnet?.startsWith('magnet:')) continue

    const id =
      gameById[gameKey.toLowerCase()] ||
      gameByName[gameKey.toLowerCase()] ||
      games.find((g) => g.name.toLowerCase().includes(gameKey.toLowerCase()))?.id

    if (id) result[id] = magnet
  }

  return result
}

export function isRealMagnet(link) {
  return link?.startsWith('magnet:') && !link.includes('0000000000000000')
}
