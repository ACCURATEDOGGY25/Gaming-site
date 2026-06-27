import { Link } from 'react-router-dom'
import { ArrowRight, Package, Truck } from 'lucide-react'
import ControllerCard from '../components/ControllerCard'
import controllers from '../data/controllers'

export default function Controllers() {
  return (
    <div>
      <section className="border-b border-surface-600 bg-gradient-to-b from-brand-500/10 to-surface-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Controllers & Gear
          </h1>
          <p className="mt-3 max-w-2xl text-gray-400">
            Tested units with warranty. Beat Amazon with same-day local pickup, setup add-ons,
            and bundles that include games + configuration.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand-400" />
              Free shipping over $50
            </span>
            <Link
              to="/bundles"
              className="flex items-center gap-2 font-semibold text-brand-400 hover:text-brand-300"
            >
              <Package className="h-4 w-4" />
              Save with bundles
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {controllers.map((ctrl) => (
            <ControllerCard key={ctrl.id} controller={ctrl} />
          ))}
        </div>
      </div>
    </div>
  )
}
