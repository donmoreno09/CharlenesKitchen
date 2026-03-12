// Route: /checkout
// Order form for both guests and authenticated users.
//
// For authenticated users: name and email are pre-filled from AuthContext.
// For guests: all fields are empty.
//
// On success: clears cart, navigates to /order-confirmation
//             passing the order data via React Router's location state.

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'
import orderService from '../services/orderService'

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth()
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  // Pre-fill fields for authenticated users
  const [name, setName]   = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const [errors, setErrors]         = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const orderPlaced = useRef(false)

  // Guard: if cart is empty and no order was just placed, redirect to menu
  if (cartItems.length === 0 && !orderPlaced.current) {
    navigate('/menu')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    // Shape cart items to match the Laravel StoreOrderRequest format:
    // cart_items: [{ menu_item_id, quantity }]
    const cartItemsPayload = cartItems.map(item => ({
      menu_item_id: item.menuItem.id,
      quantity: item.quantity,
    }))

    try {
      const response = await orderService.place({
        customer_name:  name,
        customer_email: email,
        customer_phone: phone || undefined,
        notes:          notes || undefined,
        cart_items:     cartItemsPayload,
      })

      // Mark order as placed so the empty-cart guard doesn't fire
      orderPlaced.current = true

      // Clear cart on success — order is placed
      clearCart()

      // Navigate to confirmation, passing the order data as route state.
      // The confirmation page reads this via useLocation().state.
      navigate('/order-confirmation', {
        state: { order: response.data },
        replace: true,   // Prevent navigating back to checkout after success
      })

    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        setErrors({ general: err.response?.data?.message || 'Failed to place order. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldError = (field) => errors[field]?.[0] || null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-2">Checkout</h1>
      <p className="text-gray-500 text-sm mb-8">
        {isAuthenticated
          ? 'Review your details and place your order.'
          : 'Fill in your details to place your order. No account needed.'}
      </p>

      {errors.general && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {errors.general}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── Order Form ───────────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                          focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {fieldError('customer_name') && (
                <p className="mt-1 text-xs text-red-500">{fieldError('customer_name')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                          focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {fieldError('customer_email') && (
                <p className="mt-1 text-xs text-red-500">{fieldError('customer_email')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                          focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Allergies, special requests..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                          focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gray-800 text-white text-sm font-medium rounded-lg
                        hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                        transition-colors"
            >
              {isSubmitting ? 'Placing order...' : `Place Order — €${cartTotal.toFixed(2)}`}
            </button>

          </form>
        </div>

        {/* ── Order Summary Sidebar ────────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Order Summary</h2>
            <div className="space-y-2 mb-3">
              {cartItems.map(item => (
                <div key={item.menuItem.id} className="flex justify-between text-sm text-gray-600">
                  <span className="truncate flex-1 mr-2">
                    {item.quantity}× {item.menuItem.name}
                  </span>
                  <span className="whitespace-nowrap font-medium">
                    €{(parseFloat(item.menuItem.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}