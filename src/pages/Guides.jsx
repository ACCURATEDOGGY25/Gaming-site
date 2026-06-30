import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import guides from '../data/guides'

export default function Guides() {
  return (
    <div>
      <section className="border-b border-surface-600 bg-gradient-to-b from-brand-500/10 to-surface-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
            <BookOpen className="h-3.5 w-3.5" />
            Curated guides
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Gaming & PC Guides
          </h1>
          <p className="mt-3 max-w-2xl text-gray-400">
            Honest recommendations — the right gear, games, and services. Each guide links to
            what we actually sell and book.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              to={`/guides/${guide.id}`}
              className="group overflow-hidden rounded-xl border border-surface-600 bg-surface-800 transition hover:border-brand-500/50"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5" />
                  {guide.readTime}
                </div>
                <h2 className="mt-2 font-display text-lg font-bold text-white group-hover:text-brand-300">
                  {guide.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{guide.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-400">
                  Read guide <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
