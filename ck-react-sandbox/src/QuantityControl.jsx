// src/QuantityControl.jsx
// A component that lets a user increase or decrease an item quantity.
// This is the exact component we will use in the real cart.

import { useState } from 'react'

export default function QuantityControl({ itemName, unitPrice }) {
  // quantity is local state — it lives inside this component.
  // When setQuantity is called, React re-renders ONLY this component.
  const [quantity, setQuantity] = useState(1)

  // Derived value — not stored in state, calculated on every render.
  // Any value that can be computed from existing state or props should NOT
  // be stored separately in state — just calculate it inline.
  const subtotal = (quantity * unitPrice).toFixed(2)

  function handleDecrease() {
    // Guard clause — prevent going below 0 before calling setter
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
    }
  }

  function handleIncrease() {
    setQuantity(prev => prev + 1)
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '300px' }}>
      <h3>{itemName}</h3>
      <p>Unit price: €{unitPrice.toFixed(2)}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
        <button onClick={handleDecrease}>−</button>

        {/* quantity is read from state — React displays the current value */}
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{quantity}</span>

        <button onClick={handleIncrease}>+</button>
      </div>

      {/* This re-renders automatically whenever quantity changes */}
      <p>Subtotal: <strong>€{subtotal}</strong></p>

      {/* Only shown when quantity reaches 0 */}
      {quantity === 0 && (
        <p style={{ color: 'red', fontSize: '0.85rem' }}>
          Item will be removed from cart
        </p>
      )}
    </div>
  )
}