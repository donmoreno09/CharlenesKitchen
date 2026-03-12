// Route: /menu
// Fetches categories and menu items, manages the selected category filter,
// and delegates rendering to CategoryTabs and MenuGrid.
//
// Data flow:
//   MenuPage (fetches + owns state)
//   ├── CategoryTabs (renders tabs, calls back with selected id)
//   └── MenuGrid (renders filtered items)
//       └── MenuCard (renders one item)
//           └── AddToCartButton (reads CartContext)

import { useState, useEffect, useMemo } from 'react'
import menuService from '../services/menuService'
import CategoryTabs from '../components/ui/CategoryTabs'
import MenuGrid from '../components/ui/MenuGrid'
import Spinner from '../components/ui/Spinner'

export default function MenuPage() {
  const [categories, setCategories]         = useState([])
  const [menuItems, setMenuItems]           = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [loading, setLoading]               = useState(true)
  const [error, setError]                   = useState(null)

  // Fetch categories and menu items in parallel on mount
  useEffect(() => {
    async function fetchMenuData() {
      try {
        // Promise.all fires both requests simultaneously — faster than sequential
        const [categoriesRes, itemsRes] = await Promise.all([
          menuService.getCategories(),
          menuService.getAll(),
        ])

        setCategories(categoriesRes.data)
        setMenuItems(itemsRes.data)
      } catch {
        setError('Failed to load the menu. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchMenuData()
  }, [])

  // Derived value: filter items by selected category
  // useMemo prevents recalculating on every render — only recalculates
  // when menuItems or selectedCategoryId changes.
  const filteredItems = useMemo(() => {
    if (selectedCategoryId === null) return menuItems
    return menuItems.filter(item => item.category_id === selectedCategoryId)
  }, [menuItems, selectedCategoryId])

  if (loading) return <Spinner message="Loading menu..." />

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 text-sm">{error}</div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Menu</h1>

      {/* Category filter tabs */}
      <div className="mb-6">
        <CategoryTabs
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </div>

      {/* Menu item grid */}
      <MenuGrid items={filteredItems} />

    </div>
  )
}