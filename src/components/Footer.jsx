import { Link } from 'react-router-dom'
import { Gamepad2, Download, Shield, Phone, Mail } from 'lucide-react'
import siteConfig from '../data/siteConfig'

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
                <Link to="/guides" className="hover:text-brand-300">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-300">
                  Contact
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
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-center gap-2 hover:text-brand-300">
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-brand-300">
                  <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-500">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                {siteConfig.guarantees.setup}
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
