// src/App.jsx
// This is the root component of the application.
// Everything you build in this sandbox will be imported and rendered here.

// src/App.jsx

import MenuCard from './MenuCard.jsx'

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Our Menu</h1>

      {/* Each component instance receives different props.
          Curly braces around numbers and booleans are required —
          without them, they would be treated as strings. */}
      <MenuCard
        name="Margherita Pizza"
        price={12.50}
        description="Classic tomato and mozzarella"
        isAvailable={true}
      />
      <MenuCard
        name="Pepperoni Pizza"
        price={14.00}
        description="Loaded with pepperoni"
        isAvailable={true}
      />
      <MenuCard
        name="Truffle Risotto"
        price={18.00}
        description="Arborio rice with black truffle"
        isAvailable={false}
      />
    </div>
  )
}