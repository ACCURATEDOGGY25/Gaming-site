const STORAGE_KEY = 'dgames-magnet-links'

export function loadMagnetLinks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

export function saveMagnetLink(gameId, magnetLink) {
  const links = loadMagnetLinks()
  if (magnetLink.trim()) {
    links[gameId] = magnetLink.trim()
  } else {
    delete links[gameId]
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
  return links
}

export function saveAllMagnetLinks(linksMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(linksMap))
}

export function getMagnetLink(gameId, defaultLink) {
  const links = loadMagnetLinks()
  return links[gameId] || defaultLink
}

export function hasCustomLink(gameId) {
  const links = loadMagnetLinks()
  return Boolean(links[gameId])
}

export function exportLinksJson() {
  return JSON.stringify(loadMagnetLinks(), null, 2)
}

export function importLinksJson(json) {
  const parsed = JSON.parse(json)
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Invalid JSON — expected an object of game IDs to magnet links')
  }
  saveAllMagnetLinks(parsed)
  return parsed
}
