// Renders a horizontal row of category filter tabs.
// Receives categories as props — does not fetch data itself.
//
// Props:
//   categories     : array of category objects from the API
//   selectedId     : the currently selected category id (null = show all)
//   onSelect       : callback called with a category id (or null for "All")

export default function CategoryTabs({ categories, selectedId, onSelect }) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2">

        {/* "All" tab — always first, selects null to show all items */}
        <button
            onClick={() => onSelect(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${selectedId === null
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
        >
            All
        </button>

        {categories.map(category => (
            <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${selectedId === category.id
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
            >
            {category.name}
            </button>
        ))}

        </div>
    )
}