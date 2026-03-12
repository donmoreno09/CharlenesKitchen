// Route: /track/:token
// Public page — lets guests look up their order using the UUID token.
// The token comes from the URL param, not from any stored state.
//
// Can also be used directly by pasting the token from the confirmation email.

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import orderService from '../services/orderService'

// Maps order status to a user-friendly label and colour
const STATUS_CONFIG = {
  pending:   { label: 'Pending',    color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  confirmed: { label: 'Confirmed',  color: 'text-blue-600 bg-blue-50 border-blue-200' },
  preparing: { label: 'Preparing',  color: 'text-orange-600 bg-orange-50 border-orange-200' },
  ready:     { label: 'Ready',      color: 'text-green-600 bg-green-50 border-green-200' },
  delivered: { label: 'Delivered',  color: 'text-gray-600 bg-gray-50 border-gray-200' },
  cancelled: { label: 'Cancelled',  color: 'text-red-600 bg-red-50 border-red-200' },
}

export default function OrderTrackingPage() {
  // useParams() reads URL params — :token from the route definition
  const { token } = useParams()

  const [order, setOrder]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await orderService.trackByToken(token)
        setOrder(response.data)
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Order not found. Please check your tracking token.')
        } else {
          setError('Failed to load order. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [token])

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center text-gray-400 text-sm">
        Looking up your order...
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-600 text-sm mb-6">{error}</p>
        <Link to="/menu" className="text-sm text-gray-600 underline hover:text-gray-800">
          Back to Menu
        </Link>
      </div>
    )
  }

  const statusConfig = STATUS_CONFIG[order.status] || {
    label: order.status,
    color: 'text-gray-600 bg-gray-50 border-gray-200',
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-1">Order #{order.id}</h1>
      <p className="text-gray-500 text-sm mb-6">Placed by {order.customer_name}</p>

      {/* Status badge */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      border mb-6 ${statusConfig.color}`}>
        {statusConfig.label}
      </div>

      {/* Order items */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Items</h2>
        <div className="space-y-2">
          {order.order_items?.map(item => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600">
              <span>{item.quantity}× {item.menu_item_name}</span>
              <span className="font-medium">€{parseFloat(item.subtotal).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span>€{parseFloat(order.total_price).toFixed(2)}</span>
        </div>
      </div>

      {order.notes && (
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4 text-sm text-gray-600">
          <span className="font-medium text-gray-700">Notes: </span>{order.notes}
        </div>
      )}

      <Link
        to="/menu"
        className="text-sm text-gray-500 hover:text-gray-800 underline transition-colors"
      >
        ← Back to Menu
      </Link>

    </div>
  )
}