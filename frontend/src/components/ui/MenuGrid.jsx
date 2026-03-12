// Renders a responsive grid of MenuCard components.
// Receives filtered items as props.
//
// Props:
//   items : array of menu item objects

import MenuCard from './MenuCard'

export default function MenuGrid({ items }) {
    if (items.length === 0) {
        return (
        <div className="py-16 text-center text-gray-400 text-sm">
            No items available in this category.
        </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map(item => (
            <MenuCard key={item.id} item={item} />
        ))}
        </div>
    )
}