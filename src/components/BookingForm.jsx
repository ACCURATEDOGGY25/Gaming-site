import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, CheckCircle } from 'lucide-react'
import services from '../data/services'

const BOOKINGS_KEY = 'dgames-bookings'

export function saveBooking(data) {
  const existing = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]')
  const booking = {
    id: `BK-${Date.now().toString(36).toUpperCase()}`,
    ...data,
    date: new Date().toISOString(),
    status: 'pending',
  }
  existing.unshift(booking)
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(existing))
  return booking
}

export default function BookingForm({ preselectedService = '', compact = false }) {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService,
    message: '',
    preferredDate: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const booking = saveBooking(form)
    setBookingId(booking.id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
        <h3 className="mt-4 font-display text-xl font-bold text-white">Booking Received!</h3>
        <p className="mt-2 text-sm text-gray-400">
          Reference: <span className="font-mono text-brand-300">{bookingId}</span>
        </p>
        <p className="mt-2 text-sm text-gray-400">
          We&apos;ll confirm within 2 hours. Check your email at {form.email}.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-bold text-surface-900 hover:bg-brand-400"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2'}>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-400">Full Name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-400">Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-400">Phone</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-400">Service</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
          >
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — ${s.price}
              </option>
            ))}
            <option value="other">Other / Not sure</option>
          </select>
        </div>
        {!compact && (
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-400">
              Preferred date (optional)
            </label>
            <input
              name="preferredDate"
              type="date"
              value={form.preferredDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
            />
          </div>
        )}
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label className="mb-1 block text-xs font-semibold text-gray-400">
            What do you need help with?
          </label>
          <textarea
            name="message"
            rows={compact ? 3 : 4}
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your issue or what you want set up..."
            className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-brand-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-3 font-bold text-surface-900 hover:bg-brand-400"
      >
        <Send className="h-4 w-4" />
        Request Booking
      </button>
    </form>
  )
}
