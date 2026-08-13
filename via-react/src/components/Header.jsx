import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useCart } from '../context/CartContext'
import { VIA_WHATSAPP_NUMBER } from '../config'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header({ onOpenNav, onOpenSearch }) {
  const { count, toggleCart } = useCart()

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <button
          className="icon-btn header-menu-btn"
          onClick={onOpenNav}
          aria-label="Open menu"
        >
          <Icon name="menu" />
        </button>
        <Link to="/" className="site-header__logo" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img
            src="/via-logo.png"
            alt="VIA Jewellery"
            className="header-logo-img"
            style={{ height: '42px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}
          />
        </Link>
      </div>

      <nav className="site-header__nav">
        {NAV_LINKS.map((link, i) =>
          link.plain ? (
            <a key={i} className="nav-link" href={link.to}>
              {link.label}
            </a>
          ) : (
            <NavLink
              key={i}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' is-active' : '')
              }
            >
              {link.label}
            </NavLink>
          )
        )}
      </nav>

      <div className="site-header__right">
        <div className="nav-divider" />
        <div className="site-header__actions">
          <button className="icon-btn" onClick={onOpenSearch} aria-label="Search">
            <Icon name="search" />
          </button>
          <Link to="/shop" className="icon-btn hide-mobile" aria-label="Wishlist">
            <Icon name="favorite_border" />
          </Link>
          <a
            href={`https://wa.me/${VIA_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="icon-btn hide-mobile"
            aria-label="WhatsApp"
          >
            <Icon name="chat" />
          </a>
          <button className="icon-btn cart-btn" onClick={toggleCart} aria-label="Cart">
            <Icon name="shopping_bag" />
            <span className="cart-badge">{count}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
