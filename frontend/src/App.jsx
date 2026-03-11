// Root component. Defines the routing tree.
//
// The structure:
// - BrowserRouter enables client-side routing for the whole app
// - The "/" route renders RootLayout — which always shows Navbar + Footer
// - All page routes are children of "/" — they render inside RootLayout's <Outlet />
// - The index route (index={true}) renders MenuPage at exactly "/"
// - A catch-all "*" route handles any unmatched URL

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RootLayout wraps all pages — Navbar and Footer always render */}
        <Route path="/" element={<RootLayout />}>

          {/* index={true} means this renders at exactly "/" */}
          <Route index element={<Navigate to="/menu" replace />} />

          <Route path="menu" element={<MenuPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="track/:token" element={<OrderTrackingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Catch-all: redirect unknown URLs to /menu */}
          <Route path="*" element={<Navigate to="/menu" replace />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}