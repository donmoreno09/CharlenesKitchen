// Only exports CartProvider — a single React component.
// Context object lives in CartContext.js, hook lives in useCart.js.
//
// Design decisions:
// 1. Cart items are stored as { menuItem: {...}, quantity: N }
//    We store the full menuItem object (not just the ID) so components
//    can render name, price, and image without extra API calls.
// 2. cartTotal and cartCount are derived values — computed from cartItems,
//    never stored as separate state.
// 3. The cart is NOT persisted to localStorage.
//    It resets on refresh — intentional for a food ordering app where
//    stale carts could contain unavailable items.

import { useState } from 'react'
import { CartContext } from './CartContext'

export function CartProvider({ children }) {
  // cartItems shape: [{ menuItem: { id, name, price, ... }, quantity: N }, ...]
  const [cartItems, setCartItems] = useState([])

  // ── Add to Cart ────────────────────────────────────────────────────────────
  //
  // If the item is already in the cart, increment its quantity.
  // If not, add it with quantity 1.
  // We use the functional update form (prev =>) because the new state
  // depends on the current state — this is always safer than reading
  // cartItems directly inside the updater.
  const addToCart = (menuItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.menuItem.id === menuItem.id)

      if (existing) {
        // Item already in cart — return a new array with updated quantity
        // map() creates a new array — never mutate the existing array
        return prev.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // New item — append to the end of the cart
      return [...prev, { menuItem, quantity: 1 }]
    })
  }

  // ── Remove from Cart ───────────────────────────────────────────────────────
  //
  // filter() creates a new array excluding the item with the given ID.
  const removeFromCart = (menuItemId) => {
    setCartItems(prev => prev.filter(item => item.menuItem.id !== menuItemId))
  }

  // ── Update Quantity ────────────────────────────────────────────────────────
  //
  // Sets quantity directly. If quantity is 0 or less, removes the item.
  // This supports both the +/- buttons and a direct quantity input.
  const updateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId)
      return
    }

    setCartItems(prev =>
      prev.map(item =>
        item.menuItem.id === menuItemId
          ? { ...item, quantity }
          : item
      )
    )
  }

  // ── Clear Cart ─────────────────────────────────────────────────────────────
  //
  // Called after a successful order is placed.
  const clearCart = () => setCartItems([])

  // ── Is In Cart ─────────────────────────────────────────────────────────────
  //
  // Utility for components to check if an item is already in the cart.
  // Used to show "Added" vs "Add to Cart" button states.
  const isInCart = (menuItemId) => {
    return cartItems.some(item => item.menuItem.id === menuItemId)
  }

  // ── Derived Values ─────────────────────────────────────────────────────────
  //
  // Computed from cartItems on every render — always in sync.
  // reduce() is the correct tool for summing values in an array.

  // Total number of individual items (e.g. 2 pizzas + 3 pastas = 5)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.menuItem.price) * item.quantity),
    0
  )

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}