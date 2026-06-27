import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Save,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Link2,
  Search,
  Lock,
  LogOut,
  ClipboardPaste,
  Filter,
} from 'lucide-react'
import { rawGames as games } from '../data/games'
import {
  loadMagnetLinks,
  saveMagnetLink,
  exportLinksJson,
  importLinksJson,
  hasCustomLink,
} from '../utils/gameLinks'
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  getAdminPin,
  setAdminPin,
  DEFAULT_ADMIN_PIN,
} from '../utils/adminAuth'
import { parseBulkLinks, isRealMagnet } from '../utils/bulkLinks'

function AdminLogin({ onLogin }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loginAdmin(pin)) {
      onLogin()
    } else {
      setError('Wrong PIN. Default is dgames2024')
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-xl border border-surface-600 bg-surface-800 p-8">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/20">
            <Lock className="h-7 w-7 text-brand-400" />
          </div>
        </div>
        <h1 className="text-center font-display text-2xl font-bold text-white">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-gray-400">
          Enter your admin PIN to manage magnet links
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Admin PIN"
            className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-3 text-white outline-none focus:border-brand-500"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-500 py-3 font-bold text-surface-900 hover:bg-brand-400"
          >
            Unlock Admin
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-600">
          Default PIN: {DEFAULT_ADMIN_PIN} — change it after login
        </p>
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(isAdminAuthenticated)
  const [links, setLinks] = useState(() => {
    const saved = loadMagnetLinks()
    const merged = {}
    games.forEach((g) => {
      merged[g.id] = saved[g.id] || g.magnetLink || ''
    })
    return merged
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [importText, setImportText] = useState('')
  const [bulkText, setBulkText] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [newPin, setNewPin] = useState('')
  const [showPinChange, setShowPinChange] = useState(false)

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />
  }

  const stats = useMemo(() => {
    const withLink = games.filter((g) => isRealMagnet(links[g.id])).length
    return { total: games.length, withLink, missing: games.length - withLink }
  }, [links])

  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.id.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)

      const hasLink = isRealMagnet(links[g.id])
      const matchesFilter =
        filter === 'all' ||
        (filter === 'set' && hasLink) ||
        (filter === 'missing' && !hasLink)

      return matchesSearch && matchesFilter
    })
  }, [search, filter, links])

  const flashSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleChange = (gameId, value) => {
    setLinks((prev) => ({ ...prev, [gameId]: value }))
    setSaved(false)
  }

  const handleSaveOne = (gameId) => {
    saveMagnetLink(gameId, links[gameId])
    flashSaved()
  }

  const handleSaveAll = () => {
    games.forEach((g) => saveMagnetLink(g.id, links[g.id] || ''))
    flashSaved()
  }

  const handleExport = () => {
    const blob = new Blob([exportLinksJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dgames-magnet-links.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    try {
      const parsed = importLinksJson(importText)
      const merged = { ...links }
      games.forEach((g) => {
        if (parsed[g.id]) merged[g.id] = parsed[g.id]
      })
      setLinks(merged)
      games.forEach((g) => {
        if (parsed[g.id]) saveMagnetLink(g.id, parsed[g.id])
      })
      setImportText('')
      setError('')
      flashSaved()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleBulkPaste = () => {
    try {
      const parsed = parseBulkLinks(bulkText, games)
      const count = Object.keys(parsed).length
      if (count === 0) {
        setError('No links matched. Use format: mk11 | magnet:?xt=...')
        return
      }
      const merged = { ...links, ...parsed }
      setLinks(merged)
      Object.entries(parsed).forEach(([id, link]) => saveMagnetLink(id, link))
      setBulkText('')
      setError('')
      flashSaved()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleChangePin = () => {
    if (newPin.length < 4) {
      setError('PIN must be at least 4 characters')
      return
    }
    setAdminPin(newPin)
    setNewPin('')
    setShowPinChange(false)
    setError('')
    flashSaved()
  }

  const handleLogout = () => {
    logoutAdmin()
    setAuthed(false)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-surface-600 px-3 py-1.5 text-xs font-semibold text-gray-400 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Admin Panel</h1>
        <p className="mt-2 text-gray-400">Manage magnet links for all {stats.total} games</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Games', value: stats.total, color: 'text-white' },
          { label: 'Links Set', value: stats.withLink, color: 'text-green-400' },
          { label: 'Need Links', value: stats.missing, color: 'text-yellow-400' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-surface-600 bg-surface-800 p-5 text-center"
          >
            <p className={`font-display text-3xl font-bold ${color}`}>{value}</p>
            <p className="mt-1 text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {saved && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
          <CheckCircle className="h-4 w-4" />
          Saved successfully
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="mb-8 rounded-xl border border-brand-500/30 bg-brand-500/5 p-5">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-brand-300">
          <ClipboardPaste className="h-4 w-4" />
          Bulk Paste Links
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Paste multiple links at once. One per line:
        </p>
        <pre className="mt-2 rounded-lg bg-surface-900 p-3 text-xs text-gray-500">
{`mk11 | magnet:?xt=urn:btih:...
fc26 | magnet:?xt=urn:btih:...
Mortal Kombat 1: magnet:?xt=...`}
        </pre>
        <textarea
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          rows={5}
          placeholder="Paste your links here..."
          className="mt-3 w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-3 text-xs text-white outline-none focus:border-brand-500"
        />
        <button
          type="button"
          onClick={handleBulkPaste}
          className="mt-3 flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-surface-900 hover:bg-brand-400"
        >
          <Upload className="h-4 w-4" />
          Apply Bulk Links
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSaveAll}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-surface-900 hover:bg-brand-400"
        >
          <Save className="h-4 w-4" />
          Save All
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg border border-surface-600 px-4 py-2 text-sm font-semibold text-gray-300 hover:border-brand-500"
        >
          <Download className="h-4 w-4" />
          Export JSON
        </button>
        <button
          type="button"
          onClick={() => setShowPinChange(!showPinChange)}
          className="flex items-center gap-2 rounded-lg border border-surface-600 px-4 py-2 text-sm font-semibold text-gray-300 hover:border-brand-500"
        >
          <Lock className="h-4 w-4" />
          Change PIN
        </button>
      </div>

      {showPinChange && (
        <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-surface-600 bg-surface-800 p-4">
          <input
            type="password"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="New PIN (min 4 chars)"
            className="flex-1 rounded-lg border border-surface-600 bg-surface-700 px-4 py-2 text-sm text-white outline-none focus:border-brand-500"
          />
          <button
            type="button"
            onClick={handleChangePin}
            className="rounded-lg bg-surface-600 px-4 py-2 text-sm font-semibold text-white hover:bg-surface-500"
          >
            Update PIN
          </button>
          <p className="w-full text-xs text-gray-500">
            {getAdminPin() !== DEFAULT_ADMIN_PIN ? 'Custom PIN is set' : `Default PIN: ${DEFAULT_ADMIN_PIN}`}
          </p>
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search games..."
            className="w-full rounded-lg border border-surface-600 bg-surface-800 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-brand-500"
          />
        </div>
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'missing', label: 'Needs Link' },
            { id: 'set', label: 'Has Link' },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold ${
                filter === id
                  ? 'bg-brand-500 text-surface-900'
                  : 'bg-surface-700 text-gray-400 hover:text-white'
              }`}
            >
              {id === 'all' && <Filter className="h-3 w-3" />}
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredGames.map((game) => {
          const hasLink = isRealMagnet(links[game.id])

          return (
            <div
              key={game.id}
              className="rounded-xl border border-surface-600 bg-surface-800 p-4"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-white">{game.name}</h3>
                  <p className="text-xs text-gray-500">
                    Tier {game.graphicsTier} · ~{game.fileSizeGB} GB ·{' '}
                    <span className="font-mono text-brand-400">{game.id}</span>
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    hasLink
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {hasLink ? 'Link set' : 'Needs link'}
                </span>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={links[game.id] || ''}
                    onChange={(e) => handleChange(game.id, e.target.value)}
                    placeholder="magnet:?xt=urn:btih:..."
                    className="w-full rounded-lg border border-surface-600 bg-surface-700 py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 outline-none focus:border-brand-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveOne(game.id)}
                  className="shrink-0 rounded-lg bg-surface-600 px-4 py-2 text-xs font-semibold text-white hover:bg-surface-500"
                >
                  Save
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredGames.length === 0 && (
        <p className="py-10 text-center text-gray-500">No games match your search.</p>
      )}

      <div className="mt-10 rounded-xl border border-surface-600 bg-surface-800 p-5">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-brand-400">
          Import JSON Backup
        </h2>
        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          rows={4}
          placeholder='{"mk11": "magnet:?xt=...", "fc26": "magnet:?xt=..."}'
          className="mt-3 w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-3 text-xs text-white outline-none focus:border-brand-500"
        />
        <button
          type="button"
          onClick={handleImport}
          className="mt-3 flex items-center gap-2 rounded-lg border border-surface-600 px-4 py-2 text-sm font-semibold text-gray-300 hover:border-brand-500"
        >
          <Upload className="h-4 w-4" />
          Import JSON
        </button>
      </div>
    </div>
  )
}
