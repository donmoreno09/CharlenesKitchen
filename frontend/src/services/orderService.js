// All API calls related to orders.

import api from './api'

const orderService = {
  // POST /api/orders
  // Works for both guests and authenticated users.
  // orderData = { customer_name, customer_email, customer_phone?, notes?, cart_items }
  place: async (orderData) => {
    const response = await api.post('/orders', orderData)
    return response.data
  },

  // GET /api/orders/track/:token
  // Public guest order tracking
  trackByToken: async (token) => {
    const response = await api.get(`/orders/track/${token}`)
    return response.data
  },

  // GET /api/orders
  // Authenticated user's order history
  getMyOrders: async () => {
    const response = await api.get('/orders')
    return response.data
  },

  // GET /api/orders/:id
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },
}

export default orderService