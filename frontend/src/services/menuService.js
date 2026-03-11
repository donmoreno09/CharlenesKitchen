// All API calls related to categories and menu items.
// Components import these functions — they never call axios directly.
//
// Each function returns the response data directly (not the full Axios response),
// so callers get clean data: const items = await menuService.getAll()

import api from './api'

const menuService = {
  // GET /api/categories
  // Returns all active categories (with menu item count)
  getCategories: async () => {
    const response = await api.get('/categories')
    return response.data
  },

  // GET /api/menu-items
  // Returns all available menu items with their categories
  getAll: async () => {
    const response = await api.get('/menu-items')
    return response.data
  },

  // GET /api/menu-items/:id
  getById: async (id) => {
    const response = await api.get(`/menu-items/${id}`)
    return response.data
  },
}

export default menuService