import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useCart } from '../../context/useCart'

export default function RootLayout() {
  const { isAuthenticated, user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()    // AuthContext clears token, user, and navigates to /login
    // clearCart() will be called here in Phase 4D once we confirm
    // the nesting order supports it
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

        <Link to="/menu" className="text-xl font-bold text-gray-800">
          Charlene's Kitchen 🍽️
        </Link>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Link to="/menu" className="hover:text-gray-900">
            Menu
          </Link>

          {/* Cart link with live item count badge */}
          <Link to="/cart" className="relative hover:text-gray-900">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-gray-800 text-white
                              text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            // Authenticated state: show user name and logout button
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
            // Guest state: show login and register links
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-gray-900">Login</Link>
              <Link
                to="/register"
                className="px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ── Page Content ────────────────────────────────────────────────── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Charlene's Kitchen
      </footer>

    </div>
  )
}