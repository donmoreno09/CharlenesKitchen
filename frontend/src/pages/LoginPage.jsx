// Login form wired to AuthContext's login() function.
//
// State management:
// - email, password: controlled inputs (form field values)
// - error: API error message to display
// - isSubmitting: prevents double-submission while request is in flight
//
// On success: AuthContext.login() navigates to /menu automatically.
// On failure: error state is set and displayed below the form.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function LoginPage() {
  const { login } = useAuth()

  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [error, setError]           = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()   // Prevent browser's default form submission

    setError(null)        // Clear any previous error
    setIsSubmitting(true)

    try {
      // AuthContext.login() calls the API, stores the token,
      // and navigates to /menu on success.
      await login(email, password)
    } catch (err) {
      // Laravel returns validation errors in err.response.data.errors
      // and a general message in err.response.data.message
      const message =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        'Login failed. Please try again.'

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-8">
          Sign in to your Charlene's Kitchen account
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Login form — no <form> action, all handled via onSubmit */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg
                      hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-gray-800 font-medium hover:underline">
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}