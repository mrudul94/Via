const WISHLIST_KEY = 'via_wishlist'

export const wishlistService = {
  getWishlist: () => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  },
  toggleWishlist: (productId) => {
    const list = wishlistService.getWishlist()
    const index = list.indexOf(productId)
    let nextList = []
    if (index > -1) {
      nextList = list.filter((id) => id !== productId)
    } else {
      nextList = [...list, productId]
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(nextList))
    return nextList.includes(productId)
  },
}
