// src/CheckoutNameInput.jsx
// A controlled input — the input's value is always in sync with React state.
// This is the foundational pattern for all form inputs in the app.

import { useState } from 'react'

export default function CheckoutNameInput() {
  // customerName state holds what the user has typed
  const [customerName, setCustomerName] = useState('')

  // onChange fires on every keystroke.
  // e.target.value is the current content of the input field.
  function handleChange(e) {
    setCustomerName(e.target.value)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Your name:
      </label>

      {/* The input's value is bound to state.
          Without value={customerName} the input is "uncontrolled" — React
          does not track what is in it.
          Without onChange the input becomes read-only in React's model. */}
      <input
        id="name"
        type="text"
        value={customerName}
        onChange={handleChange}
        placeholder="Enter your name"
        style={{ padding: '0.5rem', fontSize: '1rem', width: '250px' }}
      />

      {/* Live preview — updates on every keystroke because state updates on every keystroke */}
      {customerName && (
        <p style={{ marginTop: '0.5rem', color: '#666' }}>
          Order will be placed for: <strong>{customerName}</strong>
        </p>
      )}
    </div>
  )
}