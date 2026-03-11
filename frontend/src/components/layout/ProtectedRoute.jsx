// Guards routes that require authentication.
//
// Three possible states:
// 1. isLoading: true  → auth check in progress → show spinner (prevents flash)
// 2. isAuthenticated: false → not logged in → redirect to /login
// 3. isAuthenticated: true  → logged in → render the protected content
//
// Usage in App.jsx:
// <Route path="orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth()

    // Auth check is still running — render a loading indicator.
    // This prevents the redirect from firing before the session is restored.
    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
        </div>
        )
    }

    // Auth check complete — user is not authenticated
    if (!isAuthenticated) {
        // Replace: true means the /login entry replaces the protected URL
        // in history. Clicking Back from /login won't loop back to the
        // protected route.
        return <Navigate to="/login" replace />
    }

    // Auth check complete — user is authenticated. Render the page.
    return children
}