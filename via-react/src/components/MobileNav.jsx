import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import { VIA_WHATSAPP_NUMBER } from '../config'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop', end: true },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/about', label: 'About VIA' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/shipping', label: 'Shipping & Delivery' },
  { to: '/exchange', label: 'Returns & Exchange' },
  { to: '/care-guide', label: 'Jewellery Care Guide' },
  { to: '/track-order', label: 'Track Your Order' },
  { to: '/faqs', label: 'FAQs & Help' },
]

export default function MobileNav({ open, onClose }) {
  return (
    <>
      <div
        className={`mobile-nav-overlay${open ? ' is-visible' : ''}`}
        onClick={onClose}
      />
      <div className={`mobile-nav${open ? ' is-open' : ''}`}>
        <div className="mobile-nav__head">
          <Link to="/" onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img src="/via-logo.png" alt="VIA Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </Link>
          <button className="icon-btn" onClick={onClose} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
        <nav className="mobile-nav__links">
          {LINKS.map((link, i) => (
            <NavLink 
              key={i} 
              to={link.to} 
              end={link.end}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={`https://wa.me/${VIA_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Us
          </a>
        </nav>
      </div>
    </>
  )
}
