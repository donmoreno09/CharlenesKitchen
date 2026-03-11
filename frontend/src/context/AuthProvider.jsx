// Only exports AuthProvider — a single React component.
// Context object lives in AuthContext.js, hook lives in useAuth.js.

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { useCart } from './useCart'
import authService from '../services/authService'

export function AuthProvider({ children }) {
    const [user, setUser]         = useState(null)
    const [token, setToken]       = useState(null)
    const [isLoading, setIsLoading] = useState(true) // true until boot check completes
    const navigate                = useNavigate()
    const { clearCart } = useCart()

  // ── Boot: Restore Session ──────────────────────────────────────────────────
  //
  // On every app load, check localStorage for a stored token.
  // If found, call /api/me to verify it is still valid and get the user object.
  // This is what keeps the user "logged in" across browser refreshes.
  //
  // If /api/me returns 401 (token expired), the Axios response interceptor
  // in api.js clears the token and redirects to /login automatically.
    useEffect(() => {
        async function restoreSession() {
        const storedToken = localStorage.getItem('auth_token')

        if (!storedToken) {
            // No token stored — user is a guest, nothing to restore
            setIsLoading(false)
            return
        }

        try {
            // Token exists — verify it is still valid by fetching the user
            const userData = await authService.me()
            setUser(userData)
            setToken(storedToken)
        } catch {
            // Token is invalid or expired — clean up silently
            // The Axios interceptor handles the redirect
            localStorage.removeItem('auth_token')
        } finally {
            setIsLoading(false)
        }
        }

        restoreSession()
    }, []) // Empty array: run once on mount (app boot)

    // ── Login ──────────────────────────────────────────────────────────────────
    //
    // Calls the API, stores the token, sets the user, and navigates to /menu.
    // Throws on failure so the Login page can catch and display the error.
    const login = async (email, password) => {
        const data = await authService.login(email, password)

        // Store token in localStorage for persistence across refreshes.
        // The Axios request interceptor reads this key automatically.
        localStorage.setItem('auth_token', data.token)

        setToken(data.token)
        setUser(data.user)

        navigate('/menu')
    }

    // ── Register ───────────────────────────────────────────────────────────────
    //
    // Same flow as login — registration auto-logs the user in.
    const register = async (name, email, password) => {
        const data = await authService.register(name, email, password)

        localStorage.setItem('auth_token', data.token)
        setToken(data.token)
        setUser(data.user)

        navigate('/menu')
    }

    // ── Logout ─────────────────────────────────────────────────────────────────
    //
    // Invalidates the token on the server, clears all local state,
    // and redirects to /login.
    // Even if the API call fails (network error, expired token), we
    // still clear local state — the user is logged out locally regardless.
    const logout = async () => {
            try {
                await authService.logout()
            } catch {
                // Ignore errors — logging out regardless
            } finally {
                localStorage.removeItem('auth_token')
                setToken(null)
                setUser(null)
                clearCart()          // ← clear cart on logout
                navigate('/login')
            }
        }

    // ── Context Value ──────────────────────────────────────────────────────────
    //
    // Everything exported through context.
    // isAuthenticated is derived — computed from user, never stored separately.
    // Storing derived state is a common React mistake that causes sync bugs.
    const value = {
        user,
        token,
        isAuthenticated: !!user,  // true if user is not null
        isLoading,
        login,
        logout,
        register,
    }

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
}