import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider }          from './context/AuthProvider'
import { CartProvider }          from './context/CartProvider'
import ToastProvider             from './context/ToastProvider'
import RootLayout                from './components/layout/RootLayout'
import ProtectedRoute            from './components/layout/ProtectedRoute'
import GuestRoute                from './components/layout/GuestRoute'
import MenuPage                  from './pages/MenuPage'
import CheckoutPage              from './pages/CheckoutPage'
import OrderConfirmationPage     from './pages/OrderConfirmationPage'
import OrderTrackingPage         from './pages/OrderTrackingPage'
import LoginPage                 from './pages/LoginPage'
import RegisterPage              from './pages/RegisterPage'

// CartPage and CartItem are deleted — CartDrawer handles cart UX

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<RootLayout />}>

                <Route index element={<Navigate to="/menu" replace />} />

                {/* Public routes */}
                <Route path="menu"               element={<MenuPage />} />

                {/* /cart redirects to /menu — CartDrawer handles cart UX.
                    replace:true removes /cart from browser history so the
                    back button does not loop back to the redirect. */}
                <Route path="cart"               element={<Navigate to="/menu" replace />} />

                <Route path="checkout"           element={<CheckoutPage />} />
                <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="track/:token"       element={<OrderTrackingPage />} />

                {/* Guest-only routes */}
                <Route path="login"    element={<GuestRoute><LoginPage /></GuestRoute>} />
                <Route path="register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/menu" replace />} />

              </Route>
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  )
}