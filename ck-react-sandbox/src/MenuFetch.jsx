// src/MenuFetch.jsx
// Fetches menu items from an API and renders them.
// This mirrors the real Menu page — only the URL will differ.

import { useState, useEffect } from 'react'
import MenuCard from './MenuCard.jsx'

export default function MenuFetch() {
  // Three pieces of state that every data-fetching component needs:
  const [menuItems, setMenuItems] = useState([])    // The fetched data
  const [isLoading, setIsLoading] = useState(true)  // Is the request in flight?
  const [error, setError]         = useState(null)  // Did the request fail?

  // Empty dependency array = run this effect once, after the first render.
  // This is the standard "fetch data when the component loads" pattern.
  useEffect(() => {
    // We define an async function inside the effect and call it immediately.
    // useEffect cannot itself be async — see the Concept Deep Dive below.
    async function fetchMenuItems() {
      try {
        // In Phase 4B, this URL becomes: http://localhost:8000/api/menu-items
        // For now we use a public placeholder API for practice.
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=4'
        )

        if (!response.ok) {
          // HTTP errors (404, 500) do not throw by default — check manually.
          throw new Error(`HTTP error — status: ${response.status}`)
        }

        const data = await response.json()

        // Reshape the placeholder data into our MenuCard prop format.
        // In the real app the API already returns the correct shape.
        const shaped = data.map(post => ({
          id:           post.id,
          name:         `Menu Item ${post.id}`,
          price:        post.id * 3.5 + 8,
          description:  post.title.slice(0, 60),
          is_available: true,
        }))

        setMenuItems(shaped)   // Triggers re-render with data
      } catch (err) {
        setError(err.message)  // Triggers re-render with error message
      } finally {
        // finally runs whether the request succeeded or failed —
        // always stop the loading indicator after the request settles.
        setIsLoading(false)
      }
    }

    fetchMenuItems()
  }, []) // Empty array — run once on mount

  // --- Three possible render states ---

  // 1. Loading state — request is still in flight
  if (isLoading) {
    return <p>Loading menu items...</p>
  }

  // 2. Error state — request failed
  if (error) {  
    return <p style={{ color: 'red' }}>Failed to load menu: {error}</p>
  }

  // 3. Success state — data is ready
  return (
    <div>
      <h2>Menu (fetched from API)</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {menuItems.map(item => (
          <MenuCard
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            isAvailable={item.is_available}
          />
        ))}
      </div>
    </div>
  )
}