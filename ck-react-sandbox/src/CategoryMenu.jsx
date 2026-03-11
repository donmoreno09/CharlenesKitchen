// src/CategoryMenu.jsx
// Demonstrates how useEffect reacts to state changes.
// When selectedCategory changes, the effect re-fires and fetches new data.
// This is the exact pattern for the category filter on the real menu page.

import { useState, useEffect } from 'react'

const categories = ['pizza', 'pasta', 'salad']

export default function CategoryMenu() {
  const [selectedCategory, setSelectedCategory] = useState('pizza')
  const [items, setItems]     = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // This effect re-runs every time selectedCategory changes.
  // React compares the new value to the previous one — if different, it fires.
  useEffect(() => {

    async function fetchByCategory() {
        setIsLoading(true)
        // Simulate different results per category using a query param
        const userId = categories.indexOf(selectedCategory) + 1
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=3&userId=${userId}`
        )
        const data = await response.json()
        setItems(data)
        setIsLoading(false)
    }

    fetchByCategory()
  }, [selectedCategory]) // Re-run whenever selectedCategory changes

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Filter by Category</h2>

      {/* Clicking a button updates selectedCategory state.
          State update → re-render → useEffect sees the value changed → new fetch. */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.5rem 1rem',
              background: selectedCategory === cat ? '#333' : '#eee',
              color:      selectedCategory === cat ? '#fff' : '#333',
              border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading
        ? <p>Loading {selectedCategory} items...</p>
        : <p>{items.length} items found in {selectedCategory}</p>
      }
    </div>
  )
}