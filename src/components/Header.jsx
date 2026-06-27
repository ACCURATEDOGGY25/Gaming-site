import { Link, useLocation } from 'react-router-dom'
import { Gamepad2, ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/controllers', label: 'Controllers' },
  { to: '/bundles', label: 'Bundles' },
  { to: '/games', label: 'Games' },
  { to: '/book', label: 'Book' },
]

export default function Header() {
  const { itemCount } = useCart()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-500/20 bg-surface-900/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/30">
            <Gamepad2 className="h-5 w-5 text-surface-900" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-wider text-white">
              D GAMES
            </span>
            <span className="block text-xs text-brand-400">Gaming + Tech Services</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                location.pathname === link.to
                  ? 'bg-brand-500/20 text-brand-300'
                  : 'text-gray-400 hover:bg-surface-700 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-lg bg-surface-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-surface-600"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-surface-900">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-gray-400 hover:bg-surface-700 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-surface-600 bg-surface-800 px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-semibold uppercase ${
                location.pathname === link.to
                  ? 'bg-brand-500/20 text-brand-300'
                  : 'text-gray-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
