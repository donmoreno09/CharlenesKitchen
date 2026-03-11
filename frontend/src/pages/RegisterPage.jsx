// Registration form. Same pattern as LoginPage but with additional fields.
// password_confirmation is handled in authService — we only collect password once
// in the UI and send it as both password and password_confirmation.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function RegisterPage() {
  const { register } = useAuth()

  const [name, setName]             = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [errors, setErrors]         = useState({})  // field-level errors
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    try {
      await register(name, email, password)
      // AuthContext.register() navigates to /menu on success
    } catch (err) {
      // Laravel returns field-level errors for registration:
      // { errors: { email: ['already taken'], password: ['too short'] } }
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        setErrors({ general: err.response?.data?.message || 'Registration failed.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper: returns the first error message for a given field, or null
  const fieldError = (field) => errors[field]?.[0] || null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create an account</h1>
        <p className="text-gray-500 text-sm mb-8">
          Join Charlene's Kitchen to track your orders
        </p>

        {/* General error */}
        {errors.general && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            {/* Field-level error */}
            {fieldError('name') && (
              <p className="mt-1 text-xs text-red-500">{fieldError('name')}</p>
            )}
          </div>

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
            {fieldError('email') && (
              <p className="mt-1 text-xs text-red-500">{fieldError('email')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              minLength={8}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            {fieldError('password') && (
              <p className="mt-1 text-xs text-red-500">{fieldError('password')}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg
                      hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-800 font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}