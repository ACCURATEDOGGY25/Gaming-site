import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CreditCard, Lock, ArrowLeft } from 'lucide-react'
import { formatPrice } from '../data/pricing'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { createOrder } = useOrders()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)
  const [form, setForm] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})

  const tax = total * 0.08
  const grandTotal = total + tax

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16)
      value = value.replace(/(.{4})/g, '$1 ').trim()
    }
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4)
      if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2)
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }

    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email.includes('@')) newErrors.email = 'Valid email required'
    if (!form.name.trim()) newErrors.name = 'Name required'
    if (form.cardNumber.replace(/\s/g, '').length < 16)
      newErrors.cardNumber = 'Enter a valid 16-digit card number'
    if (form.expiry.length < 5) newErrors.expiry = 'Enter MM/YY'
    if (form.cvv.length < 3) newErrors.cvv = 'Enter CVV'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setProcessing(true)
    await new Promise((r) => setTimeout(r, 1500))

    const order = createOrder(items, {
      ...form,
      cardNumber: form.cardNumber.replace(/\s/g, ''),
    })
    clearCart()
    navigate(`/order/${order.id}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/cart"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="font-display text-3xl font-bold text-white">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-xl border border-surface-600 bg-surface-800 p-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-brand-400">
              Contact
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-400">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-400">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-surface-600 bg-surface-800 p-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-brand-400" />
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-brand-400">
                Payment
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-400">
                  Card Number
                </label>
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-xs text-red-400">{errors.cardNumber}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-400">
                    Expiry
                  </label>
                  <input
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
                  />
                  {errors.expiry && (
                    <p className="mt-1 text-xs text-red-400">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-400">
                    CVV
                  </label>
                  <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500"
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-xs text-red-400">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-3.5 font-bold text-surface-900 transition hover:bg-brand-400 disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {processing ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
          </button>
        </form>

        <div className="h-fit rounded-xl border border-surface-600 bg-surface-800 p-6">
          <h2 className="font-display text-lg font-bold text-white">Your Order</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-surface-600 pt-4 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-display text-lg font-bold text-brand-300">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
