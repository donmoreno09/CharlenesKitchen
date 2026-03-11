// The inverse of ProtectedRoute.
// If the user IS authenticated and tries to visit /login or /register,
// redirect them to /menu instead.
//
// This prevents the awkward situation of a logged-in user seeing the login form.

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export default function GuestRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
        </div>
        )
    }

    // Already logged in — no need to see login/register
    if (isAuthenticated) {
        return <Navigate to="/menu" replace />
    }

    return children
}