import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { CartProvider } from './context/CartProvider'
import RootLayout from './components/layout/RootLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import GuestRoute from './components/layout/GuestRoute'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ToastProvider from './context/ToastProvider'

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
                <Route path="cart"               element={<CartPage />} />
                <Route path="checkout"           element={<CheckoutPage />} />
                <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="track/:token"       element={<OrderTrackingPage />} />

                {/* Guest-only routes — redirect to /menu if already authenticated */}
                <Route path="login"    element={<GuestRoute><LoginPage /></GuestRoute>} />
                <Route path="register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

                {/* Protected route example — extend in Phase 5 for order history */}
                {/* <Route path="orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} /> */}

                <Route path="*" element={<Navigate to="/menu" replace />} />

              </Route>
            </Routes>
          </ToastProvider> 
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  )
}