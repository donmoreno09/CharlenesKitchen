// src/MenuList.jsx
// Renders a list of menu items from an array of data.
// This mirrors exactly how the real menu page will work —
// the only difference is the data will come from the Laravel API.

import MenuCard from './MenuCard.jsx'

// Sample data shaped exactly like what our Laravel API returns
const menuItems = [
  { id: 1, name: 'Margherita Pizza',  price: 12.50, description: 'Classic tomato and mozzarella',      is_available: true  },
  { id: 2, name: 'Pepperoni Pizza',   price: 14.00, description: 'Loaded with pepperoni',              is_available: true  },
  { id: 3, name: 'Truffle Risotto',   price: 18.00, description: 'Arborio rice with black truffle',    is_available: false },
  { id: 4, name: 'Caesar Salad',      price: 9.00,  description: 'Romaine lettuce, croutons, parmesan',is_available: true  },
]

export default function MenuList() {
  // Filter to only available items — standard JavaScript, not React-specific
  const availableItems = menuItems.filter(item => item.is_available)

  return (
    <div>
      <h2>Our Menu</h2>
      <p style={{ color: '#666' }}>{availableItems.length} items available</p>

      {/* .map() turns the array of data objects into an array of JSX elements.
          React renders arrays of JSX elements automatically.
          key={item.id} is required — use the database ID, never the index. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {availableItems.map(item => (
          <MenuCard
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            isAvailable={item.is_available}
          />
        ))}
      </div>

      {/* Fallback message when the filtered list is empty */}
      {availableItems.length === 0 && (
        <p>No items available right now. Check back soon!</p>
      )}
    </div>
  )
}