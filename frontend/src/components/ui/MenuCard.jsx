// Displays a single menu item card.
// Receives the item as a prop — no fetching, no context (except via AddToCartButton).
//
// Props:
//   item : menu item object { id, name, description, price, image_url, is_available }

import AddToCartButton from './AddToCartButton'

export default function MenuCard({ item }) {
    return (
        <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden
                        shadow-sm flex flex-col transition-opacity
                        ${!item.is_available ? 'opacity-50' : ''}`}>

        {/* Image area */}
        <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
            {item.image_url ? (
            <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover"
            />
            ) : (
            // Placeholder when no image has been uploaded yet
            <span className="text-4xl">🍽️</span>
            )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                {item.name}
            </h3>
            <span className="text-sm font-bold text-gray-800 whitespace-nowrap">
                €{parseFloat(item.price).toFixed(2)}
            </span>
            </div>

            {item.description && (
            <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">
                {item.description}
            </p>
            )}

            {item.is_available ? (
            <AddToCartButton menuItem={item} />
            ) : (
            <button
                disabled
                className="w-full py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
            >
                Unavailable
            </button>
            )}
        </div>

        </div>
    )
}