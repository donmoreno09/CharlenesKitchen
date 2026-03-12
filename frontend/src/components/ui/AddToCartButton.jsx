// Reads CartContext directly — one of the few UI components that
// touches context. Justified because it would be pure prop-drilling
// pain to pass cart state through MenuGrid → MenuCard → here.
//
// Props:
//   menuItem : the full menu item object to add to cart

import { useCart } from '../../context/useCart'

export default function AddToCartButton({ menuItem }) {
    const { addToCart, isInCart } = useCart()
    const inCart = isInCart(menuItem.id)

    return (
        <button
        onClick={() => addToCart(menuItem)}
        className={`w-full py-2 text-sm font-medium rounded-lg transition-colors
            ${inCart
            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
            : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
        >
        {inCart ? '✓ Added' : 'Add to Cart'}
        </button>
    )
}