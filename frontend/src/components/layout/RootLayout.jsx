// The persistent shell that wraps every page.
// Navbar and Footer are always rendered. The current page renders
// inside <Outlet /> — React Router swaps that out on navigation.

import { Outlet, Link } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      {/* This is a placeholder — Phase 4D builds the real Navbar     */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Charlene's Kitchen 🍽️
        </Link>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/menu" className="hover:text-gray-900">Menu</Link>
          <Link to="/cart" className="hover:text-gray-900">Cart</Link>
          <Link to="/login" className="hover:text-gray-900">Login</Link>
        </div>
      </nav>

      {/* ── Page Content ───────────────────────────────────────────── */}
      {/* Outlet renders whichever page component matches the current URL */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Charlene's Kitchen
      </footer>

    </div>
  )
}