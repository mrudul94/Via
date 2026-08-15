import { useState, useEffect, useLayoutEffect, useRef } from 'react'
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
  const topbarRef = useRef(null)

  // Publish the topbar's real rendered height as --topbar-h.
  //
  // The announcement bar wraps differently per device (emoji fall back to
  // different fonts, CMS copy varies in length) so its height cannot be
  // hard-coded. Every fixed-header offset on the site reads this variable,
  // which keeps the content offset exact on all routes and viewports.
  useLayoutEffect(() => {
    const el = topbarRef.current
    if (!el) return

    const publish = () => {
      const h = el.getBoundingClientRect().height
      if (h > 0) {
        document.documentElement.style.setProperty('--topbar-h', `${h}px`)
      }
    }

    publish()

    const observer = new ResizeObserver(publish)
    observer.observe(el)

    // Mobile address-bar show/hide fires resize without resizing the topbar;
    // re-measure anyway so an orientation change is picked up too.
    window.addEventListener('orientationchange', publish)
    window.addEventListener('resize', publish)

    // Webfonts (Marcellus/Cinzel) land after first paint and change the
    // marquee's line box, so re-measure once they are ready.
    if (document.fonts?.ready) document.fonts.ready.then(publish).catch(() => {})

    return () => {
      observer.disconnect()
      window.removeEventListener('orientationchange', publish)
      window.removeEventListener('resize', publish)
    }
  }, [])

  // Own scroll restoration completely. Left on 'auto', the browser restores a
  // stale offset asynchronously after paint on back/forward navigation, which
  // fights the reset below and lands the user mid-page under the header.
  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  // Close overlays on route change
  useEffect(() => {
    setNavOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  // Reset/anchor scroll on navigation.
  //
  // Keyed on location.key, not pathname, so a back navigation or a repeat
  // visit to the same path also resets. Runs in a layout effect so the jump
  // happens before the browser paints the new route.
  useLayoutEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }
    // Hash targets must clear the fixed topbar, otherwise the anchor lands
    // underneath it. scrollIntoView has no offset option, so do it manually.
    const el = document.querySelector(location.hash)
    if (!el) {
      window.scrollTo(0, 0)
      return
    }
    const raf = requestAnimationFrame(() => {
      const topbar =
        topbarRef.current?.getBoundingClientRect().height ?? 0
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - topbar - 16
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(raf)
  }, [location.key, location.hash])

  // Lock body scroll while a drawer/overlay is open.
  //
  // Pinning the body with position:fixed is the only lock iOS Safari honours,
  // but it drops the scroll offset — so stash and restore it, otherwise
  // closing the cart throws the user back to the top of the page.
  useEffect(() => {
    if (!(navOpen || cartOpen)) return

    const scrollY = window.pageYOffset
    document.body.style.top = `-${scrollY}px`
    document.body.classList.add('is-locked')

    return () => {
      document.body.classList.remove('is-locked')
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
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
      {/* Announcement bar + header travel as one fixed unit. Keeping them in
          a single fixed wrapper is what guarantees they can never drift apart
          and expose a strip of scrolling content between them. */}
      <div className="site-topbar" ref={topbarRef}>
        <Marquee />
        <Header
          onOpenNav={() => setNavOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />
      </div>

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
