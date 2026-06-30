import { Link } from 'react-router-dom'
import { Calendar, Phone } from 'lucide-react'
import siteConfig from '../data/siteConfig'

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-surface-600 bg-surface-900/95 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-surface-600 py-2.5 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4 text-brand-400" />
          Call
        </a>
        <Link
          to="/book"
          className="flex flex-[2] items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-sm font-bold text-surface-900"
        >
          <Calendar className="h-4 w-4" />
          Book a Service
        </Link>
      </div>
    </div>
  )
}
