// Only the custom hook — nothing else.
// Imports CartContext from CartContext.js (the context object file).
//
// Usage in any component:
//   import { useCart } from '../context/useCart'
//   const { cartItems, addToCart } = useCart()

import { useContext } from 'react'
import { CartContext } from './CartContext'

export function useCart() {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart() must be used within a <CartProvider>.')
  }

  return context
}