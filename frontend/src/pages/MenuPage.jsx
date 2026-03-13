import { useState, useEffect }  from 'react'
import Hero                     from '../components/layout/Hero'
import CategoryTabs             from '../components/ui/CategoryTabs'
import MenuGrid                 from '../components/ui/MenuGrid'
import { useCart }              from '../context/useCart'
import menuService              from '../services/menuService'

const FALLBACK_CATEGORIES = [
  { id: 'all',          label: 'Lahat',        emoji: '🍽️' },
  { id: 'silog',        label: 'Silog',        emoji: '🍳' },
  { id: 'ulam',         label: 'Ulam',         emoji: '🍲' },
  { id: 'merienda',     label: 'Merienda',     emoji: '🍢' },
  { id: 'sabaw',        label: 'Sabaw',        emoji: '🍜' },
  { id: 'inihaw',       label: 'Inihaw',       emoji: '🔥' },
  { id: 'panghimagas',  label: 'Panghimagas',  emoji: '🍮' },
  { id: 'inumin',       label: 'Inumin',       emoji: '🥤' },
]

export default function MenuPage() {
  const { cartItems, addToCart, updateQuantity } = useCart()

  const [menuItems,       setMenuItems]       = useState([])
  const [categories,      setCategories]      = useState(FALLBACK_CATEGORIES)
  const [activeCategory,  setActiveCategory]  = useState('all')
  const [loading,         setLoading]         = useState(true)
  const [error,           setError]           = useState(null)

  useEffect(() => {
    let cancelled = false
    const fetchMenu = async () => {
      try {
        setLoading(true)
        const [items, cats] = await Promise.all([
          menuService.getAll(),
          menuService.getCategories(),
        ])
        if (!cancelled) {
          setMenuItems(items)
          if (cats?.length) {
            setCategories([
              { id: 'all', label: 'Lahat', emoji: '🍽️' },
              ...cats.map(c => ({ id: c.slug, label: c.name, emoji: FALLBACK_CATEGORIES.find(f => f.id === c.slug)?.emoji ?? '🍴' })),
            ])
          }
        }
      } catch {
        if (!cancelled) setError('Hindi ma-load ang menu. Subukan ulit.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchMenu()
    return () => { cancelled = true }
  }, [])

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category?.slug === activeCategory)

  const getQty      = (id) => cartItems.find(({ menuItem }) => menuItem.id === id)?.quantity ?? 0
  const handleAdd   = (menuItem) => addToCart(menuItem)
  const handleRemove = (id) => { const q = getQty(id); if (q > 0) updateQuantity(id, q - 1) }

  return (
    <div className="min-h-screen">

      <Hero />

      {/* Sticky category bar — z-50 keeps it below navbar (z-[100]) */}
      <div
        id="menu-section"
        className="sticky top-0 z-50 border-b border-bamboo/20 backdrop-blur-xl"
        style={{ background: 'rgba(253,246,232,0.96)' }}
      >
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pt-7 pb-16">

        {/* Section heading */}
        <div
          className="flex items-center gap-3.5 mb-[18px] font-pacifico text-[24px] text-dark"
          style={{ animation: 'fadeUp 0.4s ease both' }}
        >
          <span>
            {activeCategory === 'all'
              ? 'Lahat ng Pagkain'
              : categories.find(c => c.id === activeCategory)?.label}
          </span>
          <span
            className="flex-1 block h-0.5"
            style={{ background: 'linear-gradient(to right, rgba(200,169,110,0.4), transparent)' }}
          />
          <span className="font-nunito text-[13px] text-bamboo font-bold">
            {filteredItems.length} pagkain
          </span>
        </div>

        {loading && (
          <div className="text-center py-16 font-nunito text-bamboo text-[15px]">
            Nilo-load ang menu...
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-16">
            <div className="text-[42px] mb-3">🍽️</div>
            <div className="font-pacifico text-[18px] text-rust mb-2">{error}</div>
          </div>
        )}

        {!loading && !error && (
          <MenuGrid
            items={filteredItems}
            getQty={getQty}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        )}

      </div>
    </div>
  )
}