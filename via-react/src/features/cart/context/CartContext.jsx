import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { findProduct } from '../../../data/products'
import { formatINR } from '../../../utils/format'
import { whatsappLink } from '../../../config'
import { useToast } from '../../../context/ToastContext'
import { cartRepository } from '../services/cartRepository'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const toast = useToast()
  const [cart, setCart] = useState(() => cartRepository.getCart())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    cartRepository.saveCart(cart)
  }, [cart])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((v) => !v), [])

  const addToCart = useCallback(
    (id, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === id)
        if (existing) {
          return prev.map((item) =>
            item.id === id ? { ...item, qty: item.qty + qty } : item
          )
        }
        return [...prev, { id, qty }]
      })
      openCart()
      const p = findProduct(id)
      if (p) toast(p.name + ' added to bag')
    },
    [openCart, toast]
  )

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const changeQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    )
  }, [])

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const p = findProduct(item.id)
        return sum + (p ? p.price * item.qty : 0)
      }, 0),
    [cart]
  )

  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )

  const checkoutOnWhatsApp = useCallback((customerDetails = {}) => {
    if (cart.length === 0) {
      if (toast) toast('Your bag is empty')
      return
    }

    const fullName = [customerDetails.firstName, customerDetails.lastName].filter(Boolean).join(' ')
    let msg = "✨ *VIA JEWELLERY ORDER*\n\n"
    
    msg += "🛍️ *ITEMS:*\n"
    cart.forEach((item, idx) => {
      const p = findProduct(item.id)
      if (p) {
        msg += `${idx + 1}. *${p.name}* x${item.qty} (${formatINR(p.price * item.qty)})\n`
      } else {
        msg += `${idx + 1}. Item #${item.id} x${item.qty}\n`
      }
    })

    msg += `\n💰 *TOTAL:* ${formatINR(subtotal)}\n\n`
    msg += "📍 *DELIVERY DETAILS:*\n"
    msg += `• Name: ${fullName || 'Not provided'}\n`
    msg += `• Phone: ${customerDetails.phone || 'Not provided'}\n`
    msg += `• Email: ${customerDetails.email || 'Not provided'}\n`
    msg += `• Address: ${customerDetails.address || ''}${customerDetails.city ? ', ' + customerDetails.city : ''}${customerDetails.state ? ', ' + customerDetails.state : ''}${customerDetails.pincode ? ' - ' + customerDetails.pincode : ''}\n\n`
    msg += "Could you please confirm my order and share payment details?"

    window.open(whatsappLink(msg), '_blank')
  }, [cart, subtotal, toast])

  const value = {
    cart,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    removeFromCart,
    changeQty,
    subtotal,
    count,
    checkoutOnWhatsApp,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)

export function buyOnWhatsApp(id) {
  const p = findProduct(id)
  if (!p) return
  const msg = `Hi VIA! I'd like to order:\n\n${p.name} — ${formatINR(
    p.price
  )}\nImage: ${p.img}\n\nCould you help me place this order?`
  window.open(whatsappLink(msg), '_blank')
}
