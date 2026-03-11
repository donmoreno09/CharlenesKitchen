import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { CartProvider } from './context/CartProvider'
import RootLayout from './components/layout/RootLayout'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import GuestRoute from './components/layout/GuestRoute'
import ProtectedRoute from './components/layout/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      {/*
        AuthProvider must be inside BrowserRouter because it calls useNavigate().
        useNavigate() only works inside a Router context.
      */}
      <AuthProvider>
        {/*
          CartProvider is inside AuthProvider so that AuthContext's logout()
          can eventually clear the cart. In Phase 4D, logout will call clearCart()
          from useCart() — which requires CartProvider to be in scope.
        */}
        <CartProvider>
          <Routes>
              <Route path="login" element={
                  <GuestRoute>
                    <LoginPage />
                  </GuestRoute>
                }/>
              <Route path="register" element={
                  <GuestRoute>
                    <RegisterPage />
                  </GuestRoute>
                }/>
              <Route path="/" element={<RootLayout />}>
              <Route index element={<Navigate to="/menu" replace />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="track/:token" element={<OrderTrackingPage />} />
              {/* Phase 4D: OrdersPage — protected, only for logged-in users */}
              {/* <Route path="orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} /> */}
              <Route path="*" element={<Navigate to="/menu" replace />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}