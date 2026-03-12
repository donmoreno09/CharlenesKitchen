// Renders a single cart line item with quantity controls.
//
// Props:
//   item       : { menuItem, quantity }
//   onIncrease : called when + is clicked
//   onDecrease : called when - is clicked (removes item if quantity reaches 0)
//   onRemove   : called when the remove button is clicked

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    const { menuItem, quantity } = item
    const subtotal = parseFloat(menuItem.price) * quantity

    return (
        <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">

        {/* Image */}
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {menuItem.image_url ? (
            <img src={menuItem.image_url} alt={menuItem.name} className="w-full h-full object-cover" />
            ) : (
            <span className="text-2xl">🍽️</span>
            )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{menuItem.name}</h3>
            <p className="text-xs text-gray-500">€{parseFloat(menuItem.price).toFixed(2)} each</p>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-2">
            <button
            onClick={onDecrease}
            className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center
                        justify-center hover:bg-gray-200 transition-colors text-sm font-bold"
            >
            −
            </button>
            <span className="w-6 text-center text-sm font-medium text-gray-800">
            {quantity}
            </span>
            <button
            onClick={onIncrease}
            className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center
                        justify-center hover:bg-gray-200 transition-colors text-sm font-bold"
            >
            +
            </button>
        </div>

        {/* Subtotal */}
        <div className="text-sm font-semibold text-gray-800 w-16 text-right">
            €{subtotal.toFixed(2)}
        </div>

        {/* Remove */}
        <button
            onClick={onRemove}
            className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
            aria-label="Remove item"
        >
            ×
        </button>

        </div>
    )
}