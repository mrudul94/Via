import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Marquee from './Marquee'
import Header from './Header'
import MobileNav from './MobileNav'
import SearchOverlay from './SearchOverlay'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import WhatsAppFloat from './WhatsAppFloat'
import { useCart } from '../context/CartContext'

export default function Layout() {
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isOpen: cartOpen, closeCart } = useCart()
  const location = useLocation()

  // Close overlays on route change
  useEffect(() => {
    setNavOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  // Scroll to hash targets (e.g. /#why, /#contact)
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  // Lock body scroll while a drawer/overlay is open
  useEffect(() => {
    const lock = navOpen || cartOpen
    document.body.classList.toggle('is-locked', lock)
    return () => document.body.classList.remove('is-locked')
  }, [navOpen, cartOpen])

  // Escape closes cart & search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeCart()
        setSearchOpen(false)
        setNavOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeCart])

  return (
    <>
      <Marquee />
      <Header
        onOpenNav={() => setNavOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </>
  )
}
