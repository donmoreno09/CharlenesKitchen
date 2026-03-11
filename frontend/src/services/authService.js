// All API calls related to authentication.
// Keeps auth logic out of the context file — context manages state,
// service manages API communication. One job each.

import api from './api'

const authService = {
  // POST /api/login
  // Returns { user, token } on success
  // Throws on invalid credentials (422 from Laravel)
  login: async (email, password) => {
    const response = await api.post('/login', { email, password })
    return response.data
  },

  // POST /api/register
  // Returns { user, token } on success
  register: async (name, email, password) => {
    const response = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation: password,  // Laravel requires confirmation
    })
    return response.data
  },

  // POST /api/logout
  // Invalidates the current token on the server
  logout: async () => {
    await api.post('/logout')
  },

  // GET /api/me
  // Returns the current authenticated user
  // Used on app boot to restore session from a stored token
  me: async () => {
    const response = await api.get('/me')
    return response.data
  },
}

export default authService