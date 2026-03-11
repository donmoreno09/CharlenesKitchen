// Custom hook for consuming AuthContext.
// Lives in a separate file from AuthProvider.jsx to satisfy the
// react-refresh/only-export-components ESLint rule — that rule requires
// a file to export only components OR only non-components, not both.
//
// Usage in any component:
//   import { useAuth } from '../context/useAuth'
//   const { user, login, logout } = useAuth()

import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === null) {
        throw new Error('useAuth() must be used within an <AuthProvider>.')
    }

    return context
}