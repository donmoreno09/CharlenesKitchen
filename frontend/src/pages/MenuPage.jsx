// This is a temporary test component — it will be rebuilt properly in Phase 4D.
// Its only job here is to prove the full stack connection works:
//   React → Axios → Vite Proxy → Laravel → MySQL → back to React

import { useState, useEffect } from 'react'
import menuService from '../services/menuService'

export default function MenuPage() {
  // Three-state pattern: loading → success or error
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    // Define async function inside useEffect — not the effect itself
    async function fetchCategories() {
      try {
        const data = await menuService.getCategories()
        // Laravel wraps responses in { data: [...] } via API Resources
        setCategories(data.data)
      } catch (err) {
        setError('Failed to load categories. Is the Laravel container running?')
        console.error(err)
      } finally {
        // Always set loading to false — whether success or failure
        setLoading(false)
      }
    }

    fetchCategories()
  }, []) // Empty array: run once on mount

  if (loading) {
    return (
      <div className="p-8 text-gray-500">Loading categories...</div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">{error}</div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Menu</h1>
      <ul className="space-y-2">
        {categories.map(category => (
          <li
            key={category.id}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  )
}