import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react'
import siteConfig from '../data/siteConfig'
import BookingForm from '../components/BookingForm'
import TrustSection from '../components/TrustSection'

export default function Contact() {
  return (
    <div>
      <section className="border-b border-surface-600 bg-gradient-to-b from-brand-500/10 to-surface-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-gray-400">
            {siteConfig.tagline}. Reach out for quotes, same-day help, or questions about
            bundles and services.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Get in touch</h2>
            <div className="mt-6 space-y-5">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-start gap-4 rounded-xl border border-surface-600 bg-surface-800 p-5 transition hover:border-brand-500/50"
              >
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-brand-300">{siteConfig.phone}</p>
                  <p className="mt-1 text-xs text-gray-500">Fastest for urgent issues</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-4 rounded-xl border border-surface-600 bg-surface-800 p-5 transition hover:border-brand-500/50"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-brand-300">{siteConfig.email}</p>
                </div>
              </a>

              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-xl border border-surface-600 bg-surface-800 p-5 transition hover:border-brand-500/50"
              >
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">WhatsApp</p>
                  <p className="text-gray-400">Message us directly</p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-xl border border-surface-600 bg-surface-800 p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">Service area</p>
                  <p className="text-gray-400">{siteConfig.city}, {siteConfig.region}</p>
                  <p className="mt-1 text-sm text-gray-500">{siteConfig.serviceArea}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-surface-600 bg-surface-800 p-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">Hours</p>
                  <p className="text-gray-400">{siteConfig.hours}</p>
                  <p className="mt-1 text-sm text-gray-500">{siteConfig.responseTime}</p>
                </div>
              </div>
            </div>

            <Link
              to="/book"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-3 font-bold text-surface-900 hover:bg-brand-400 sm:w-auto sm:px-8"
            >
              <Calendar className="h-4 w-4" />
              Book Online
            </Link>
          </div>

          <div className="rounded-xl border border-surface-600 bg-surface-800 p-6 lg:p-8">
            <h2 className="font-display text-xl font-bold text-white">Send a message</h2>
            <p className="mt-2 text-sm text-gray-400">
              Prefer a form? We&apos;ll get back within 2 hours during business hours.
            </p>
            <div className="mt-6">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>

      <TrustSection compact />
    </div>
  )
}
