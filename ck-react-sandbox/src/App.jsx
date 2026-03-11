// src/App.jsx
// This is the root component of the application.
// Everything you build in this sandbox will be imported and rendered here.

import QuantityControl from './QuantityControl.jsx'

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>State Demo — Cart Items</h1>

      {/* Each QuantityControl manages its own independent state.
          Changing one does not affect the other. This is local state. */}
      <QuantityControl itemName="Margherita Pizza" unitPrice={12.50} />
      <QuantityControl itemName="Pepperoni Pizza" unitPrice={14.00} />
    </div>
  )
}