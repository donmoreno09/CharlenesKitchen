// This file creates and configures a shared Axios instance.
// Every API call in the app uses this instance — not raw axios.
//
// Why a shared instance instead of importing axios directly?
// Because configuration (base URL, headers, interceptors) is defined
// ONCE here, and every service file inherits it automatically.

import axios from 'axios'

const api = axios.create({
  // The base URL is prepended to every request made with this instance.
  // '/api' works because Vite's dev proxy (Step 5) forwards /api/* to
  // http://localhost:8080 — our Laravel Docker container.
  // In production, this would be the actual domain.
  baseURL: '/api',

  // Tell Laravel we are sending and expecting JSON.
  // This sets the Content-Type and Accept headers on every request.
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// ── Request Interceptor ────────────────────────────────────────────────────────
//
// An interceptor is a function that runs on every request BEFORE it is sent.
// This one reads the auth token from localStorage and attaches it to the
// Authorization header automatically.
//
// Without this interceptor, every service function would need to do:
//   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//
// With it, that happens automatically — service files stay clean.
api.interceptors.request.use(
  (config) => {
    // Read the token from localStorage.
    // We store it there after login (Phase 4C).
    // localStorage persists across browser sessions — the user stays logged in.
    const token = localStorage.getItem('auth_token')

    if (token) {
      // Attach the token to the Authorization header.
      // Laravel's auth:sanctum middleware reads this header to identify the user.
      config.headers.Authorization = `Bearer ${token}`
    }

    return config  // Always return config — this continues the request
  },
  (error) => {
    // If something goes wrong building the request (rare), reject it
    return Promise.reject(error)
  }
)

// ── Response Interceptor ──────────────────────────────────────────────────────
//
// Runs on every response AFTER it arrives.
// We use it to handle 401 Unauthorized responses globally —
// if the token is expired or invalid, clear it and redirect to login.
//
// Without this, every service function would need its own 401 check.
api.interceptors.response.use(
  (response) => response,  // Success — pass the response through unchanged
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired — clean up and redirect to login
      localStorage.removeItem('auth_token')
      // We use window.location here because we are outside React's component tree.
      // In Phase 4C, the AuthContext will handle this more elegantly.
      window.location.href = '/login'
    }

    // Re-reject the error so individual service functions can still handle it
    return Promise.reject(error)
  }
)

export default api