const STORAGE_KEY = 'via_cart'

export const cartRepository = {
  getCart: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved) || []
    } catch (e) {
      console.warn('Storage unavailable, falling back to in-memory cart', e)
    }
    return []
  },
  saveCart: (cart) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.warn('Failed to save cart to storage', e)
    }
  },
  clearCart: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.warn('Failed to clear cart storage', e)
    }
  },
}
