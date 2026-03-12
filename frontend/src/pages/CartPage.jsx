// Route: /cart
// Displays cart contents, quantity controls, running total,
// and a button to proceed to checkout.
//
// No API calls here — all data comes from CartContext.

import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import CartItem from '../components/ui/CartItem'

export default function CartPage() {
  const { cartItems, cartTotal, addToCart, updateQuantity, removeFromCart } = useCart()

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 text-sm mb-6">
          Add some items from the menu to get started.
        </p>
        <Link
          to="/menu"
          className="inline-block px-6 py-2.5 bg-gray-800 text-white text-sm
                    font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {/* Cart items */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 mb-6">
        {cartItems.map(item => (
          <CartItem
            key={item.menuItem.id}
            item={item}
            onIncrease={() => addToCart(item.menuItem)}
            onDecrease={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
            onRemove={() => removeFromCart(item.menuItem.id)}
          />
        ))}
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Subtotal</span>
          <span>€{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-800 text-base border-t border-gray-100 pt-3">
          <span>Total</span>
          <span>€{cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          to="/menu"
          className="flex-1 py-2.5 text-center text-sm font-medium text-gray-600
                    border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to="/checkout"
          className="flex-1 py-2.5 text-center text-sm font-medium text-white
                    bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>

    </div>
  )
}