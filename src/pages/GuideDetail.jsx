import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import { getGuideById } from '../data/guides'
import UpsellBanner from '../components/UpsellBanner'

export default function GuideDetail() {
  const { id } = useParams()
  const guide = getGuideById(id)

  if (!guide) return <Navigate to="/guides" replace />

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        to="/guides"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        All Guides
      </Link>

      <div className="overflow-hidden rounded-2xl border border-surface-600">
        <img src={guide.image} alt={guide.title} className="aspect-video w-full object-cover" />
      </div>

      <header className="mt-8">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <BookOpen className="h-3.5 w-3.5" />
          {guide.readTime}
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-2 text-lg text-gray-500">{guide.subtitle}</p>
        <p className="mt-6 text-gray-400 leading-relaxed">{guide.intro}</p>
      </header>

      <div className="mt-10 space-y-10">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-xl font-bold text-white">{section.heading}</h2>
            <p className="mt-3 text-gray-400 leading-relaxed">{section.body}</p>
            <ul className="mt-4 space-y-2">
              {section.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12">
        <UpsellBanner
          title="Want us to handle it?"
          description="Book any service — we confirm within 2 hours and get you playing fast."
          to="/book"
          cta="Book now"
        />
      </div>
    </article>
  )
}
