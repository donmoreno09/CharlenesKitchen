// Route: /order-confirmation
// Shown after a successful order.
// Reads order data from React Router location state (passed from CheckoutPage).
// If accessed directly (no state), redirects to /menu.

import { useLocation, Link, Navigate } from 'react-router-dom'

export default function OrderConfirmationPage() {
    const location = useLocation()
    const order    = location.state?.order

    // Direct access without state — send them to the menu
    if (!order) {
        return <Navigate to="/menu" replace />
    }

    return (
        <div className="max-w-lg mx-auto px-4 py-16 text-center">

        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 text-sm mb-8">
            Thank you, <strong>{order.customer_name}</strong>. We've received your order
            and a confirmation email is on its way to <strong>{order.customer_email}</strong>.
        </p>

        {/* Order ID */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4 text-left">
            <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold text-gray-800">#{order.id}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold text-gray-800 capitalize">{order.status}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total</span>
            <span className="font-bold text-gray-800">€{parseFloat(order.total_price).toFixed(2)}</span>
            </div>
        </div>

        {/* Guest token — only shown for guest orders */}
        {order.guest_token && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
            <p className="text-xs font-semibold text-amber-700 mb-1 uppercase tracking-wide">
                Your Order Tracking Token
            </p>
            <p className="text-xs text-amber-600 mb-2">
                Save this token to track your order. It was also sent to your email.
            </p>
            <code className="text-sm font-mono text-amber-800 break-all">
                {order.guest_token}
            </code>
            <div className="mt-3">
                <Link
                to={`/track/${order.guest_token}`}
                className="text-xs text-amber-700 font-medium underline hover:text-amber-900"
                >
                Track your order →
                </Link>
            </div>
            </div>
        )}

        <Link
            to="/menu"
            className="inline-block px-6 py-2.5 bg-gray-800 text-white text-sm font-medium
                    rounded-lg hover:bg-gray-700 transition-colors"
        >
            Back to Menu
        </Link>

        </div>
    )
}