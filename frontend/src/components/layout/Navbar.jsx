// Top navigation bar. Auth-aware — shows different content
// based on whether the user is logged in.
//
// Reads from: AuthContext (user, isAuthenticated, logout)
//             CartContext (cartCount)

import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useCart } from '../../context/useCart'

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth()
    const { cartCount, clearCart } = useCart()

    const handleLogout = async () => {
        // Clear the cart first, then logout.
        // clearCart() is available here because CartProvider wraps the app.
        clearCart()
        await logout()
    }

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

        <Link to="/menu" className="text-xl font-bold text-gray-800">
            Charlene's Kitchen 🍽️
        </Link>

        <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link to="/menu" className="hover:text-gray-900 transition-colors">
            Menu
            </Link>

            {/* Cart link with live item count badge */}
            <Link to="/cart" className="relative hover:text-gray-900 transition-colors">
            Cart
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-gray-800 text-white
                                text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
                </span>
            )}
            </Link>

            {isAuthenticated ? (
            <div className="flex items-center gap-4">
                <span className="text-gray-500">Hi, {user.name.split(' ')[0]}</span>
                <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                Logout
                </button>
            </div>
            ) : (
            <div className="flex items-center gap-4">
                <Link to="/login" className="hover:text-gray-900 transition-colors">
                Login
                </Link>
                <Link
                to="/register"
                className="px-3 py-1.5 bg-gray-800 text-white rounded-lg
                            hover:bg-gray-700 transition-colors"
                >
                Register
                </Link>
            </div>
            )}
        </div>

        </nav>
    )
}