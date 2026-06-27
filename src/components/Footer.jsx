import { Link } from 'react-router-dom'
import { Gamepad2, Download, Shield, Wrench } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-surface-600 bg-surface-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-brand-400" />
              <span className="font-display text-lg font-bold text-white">D GAMES</span>
            </div>
            <p className="text-sm text-gray-400">
              Your local gaming + tech partner. IT services, controllers, curated games —
              we sell outcomes and convenience, not DIY homework.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-brand-400">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/services" className="hover:text-brand-300">
                  IT & Gaming Services
                </Link>
              </li>
              <li>
                <Link to="/bundles" className="hover:text-brand-300">
                  Bundles
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-brand-300">
                  Book a Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-brand-400">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/controllers" className="hover:text-brand-300">
                  Controllers
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-brand-300">
                  Game Catalog
                </Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-brand-300">
                  My Library
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-brand-300">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-brand-400">
              Why Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                Fixed packages — no surprise bills
              </li>
              <li className="flex items-start gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                30-day guarantee on all setups
              </li>
              <li className="flex items-start gap-2">
                <Download className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                Instant game downloads after purchase
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-surface-600 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} D Games. All rights reserved.
          <span className="mx-2">·</span>
          <Link to="/admin" className="text-gray-600 hover:text-gray-400">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
