import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Wrench,
  Gamepad2,
  Package,
  Shield,
  Clock,
  Star,
  BookOpen,
} from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import ControllerCard from '../components/ControllerCard'
import BundleCard from '../components/BundleCard'
import GameCard from '../components/GameCard'
import TrustSection from '../components/TrustSection'
import services from '../data/services'
import controllers from '../data/controllers'
import getAllBundles from '../data/bundles'
import getAllGames from '../data/games'
import { SERVICE_AREA, RESPONSE_TIME } from '../data/services'
import guides from '../data/guides'

export default function Home() {
  const featuredServices = services.filter((s) => s.popular || s.category === 'Gaming').slice(0, 3)
  const featuredControllers = controllers.slice(0, 3)
  const featuredBundles = getAllBundles().slice(0, 3)
  const curatedGames = getAllGames()
    .sort((a, b) => b.graphicsTier - a.graphicsTier)
    .slice(0, 4)

  return (
    <div>
      {/* Hero — Services + Controllers first */}
      <section className="relative overflow-hidden border-b border-surface-600">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 via-transparent to-surface-900" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
              <Wrench className="h-3.5 w-3.5" />
              Your local gaming + tech guy
            </span>
            <h1 className="mt-6 font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              We Fix It.
              <span className="block bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                You Play It.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-400">
              PC setup, virus removal, gaming optimization, and tested controllers — for people
              who want results, not a computer science degree. Games catalog brings you here;
              services and gear are how we deliver.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-bold text-surface-900 transition hover:bg-brand-400"
              >
                <Wrench className="h-4 w-4" />
                View IT Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/controllers"
                className="inline-flex items-center gap-2 rounded-lg border border-surface-600 px-6 py-3 font-semibold text-white transition hover:border-brand-500 hover:bg-surface-800"
              >
                <Gamepad2 className="h-4 w-4" />
                Shop Controllers
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-500/40 px-6 py-3 font-semibold text-brand-300 transition hover:bg-brand-500/10"
              >
                Book Now
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-400" />
              30-day guarantee on setups
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-400" />
              {RESPONSE_TIME}
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-brand-400" />
              {SERVICE_AREA}
            </span>
          </div>
        </div>
      </section>

      {/* IT Services — primary revenue */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              IT & Gaming Services
            </h2>
            <p className="mt-1 text-gray-400">
              Fixed packages with clear outcomes — from $49 optimization to full business setup
            </p>
          </div>
          <Link
            to="/services"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300 sm:flex"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Bundles — cross-sell */}
      <section className="border-y border-surface-600 bg-surface-800/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Curated Bundles
              </h2>
              <p className="mt-1 text-gray-400">
                Game + controller + setup — save money, skip the hassle
              </p>
            </div>
            <Link
              to="/bundles"
              className="hidden items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300 sm:flex"
            >
              All bundles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* Controllers — product margin */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Controllers & Gear
            </h2>
            <p className="mt-1 text-gray-400">
              Tested units, local pickup, setup add-ons available
            </p>
          </div>
          <Link
            to="/controllers"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300 sm:flex"
          >
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredControllers.map((ctrl) => (
            <ControllerCard key={ctrl.id} controller={ctrl} />
          ))}
        </div>
      </section>

      {/* Guides — SEO + conversion */}
      <section className="border-t border-surface-600 bg-surface-800/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Guides & Recommendations
              </h2>
              <p className="mt-1 text-gray-400">
                Curated advice that links to the right gear, games, and services
              </p>
            </div>
            <Link
              to="/guides"
              className="hidden items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300 sm:flex"
            >
              All guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                to={`/guides/${guide.id}`}
                className="group rounded-xl border border-surface-600 bg-surface-800 p-5 transition hover:border-brand-500/50"
              >
                <BookOpen className="h-6 w-6 text-brand-400" />
                <h3 className="mt-3 font-display font-bold text-white group-hover:text-brand-300">
                  {guide.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{guide.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Games — traffic / catalog */}
      <section className="border-t border-surface-600 bg-surface-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Curated Game Catalog
              </h2>
              <p className="mt-1 text-gray-400">
                Browse titles — add a setup service so it actually runs great on your PC
              </p>
            </div>
            <Link
              to="/games"
              className="hidden items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300 sm:flex"
            >
              Full catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {curatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-surface-600 bg-brand-500/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:flex-row sm:text-left">
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-white">
              Not sure where to start?
            </h2>
            <p className="mt-2 text-gray-400">
              Book a free consultation — tell us your problem and we&apos;ll point you to the
              right package.
            </p>
          </div>
          <Link
            to="/book"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-500 px-8 py-3 font-bold text-surface-900 hover:bg-brand-400"
          >
            <Package className="h-4 w-4" />
            Book a Service
          </Link>
        </div>
      </section>

      <TrustSection />
    </div>
  )
}
