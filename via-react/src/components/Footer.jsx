import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { VIA_WHATSAPP_NUMBER, VIA_INSTAGRAM } from '../config'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer id="contact" className="site-footer">
      {/* Top VIP Newsletter Banner */}
      <div className="site-footer__vip">
        <div className="site-footer__vip-content">
          <span className="site-footer__vip-tag">EXCLUSIVITY & ELEGANCE</span>
          <h3 className="site-footer__vip-title">Join The VIA Circle</h3>
          <p className="site-footer__vip-text">
            Subscribe for private collection launches, VIP rewards, and 10% off your first luxury order.
          </p>
        </div>
        <form className="site-footer__vip-form" onSubmit={handleSubscribe}>
          {subscribed ? (
            <div className="site-footer__vip-success">
              <Icon name="check_circle" className="icon-sm" /> Thank you for joining the VIA Circle! Check your inbox soon.
            </div>
          ) : (
            <div className="site-footer__vip-input-wrap">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="site-footer__vip-input"
              />
              <button type="submit" className="site-footer__vip-btn">
                <span>SUBSCRIBE</span>
                <Icon name="arrow_forward" className="icon-sm" />
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Main Footer Content Grid */}
      <div className="site-footer__grid">
        {/* Col 1: Brand & Contact */}
        <div className="site-footer__col site-footer__col--brand">
          <div className="site-footer__logo">
            VIA <span className="site-footer__logo-icon">✨</span>
          </div>
          <p className="site-footer__blurb">
            Everyday luxury anti-tarnish 18K gold-plated & sterling silver jewellery. Crafted for daily grace, waterproof durability, and timeless confidence.
          </p>
          <div className="site-footer__contact-btns">
            <a
              href={`https://wa.me/${VIA_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="site-footer__contact-chip"
            >
              <Icon name="chat" className="icon-sm" /> WhatsApp Concierge
            </a>
            <a
              href="mailto:houseofvia2@gmail.com"
              className="site-footer__contact-chip"
            >
              <Icon name="mail" className="icon-sm" /> Email Support
            </a>
          </div>
        </div>

        {/* Col 2: Shop Collections */}
        <div className="site-footer__col">
          <h4>Shop Collections</h4>
          <ul>
            <li>
              <Link to="/shop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>All Jewellery</Link>
            </li>
            <li>
              <Link to="/shop?cat=Necklaces" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Necklaces & Pendants</Link>
            </li>
            <li>
              <Link to="/shop?cat=Earrings" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Earrings & Hoops</Link>
            </li>
            <li>
              <Link to="/shop?cat=Rings" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Rings & Bands</Link>
            </li>
            <li>
              <Link to="/shop?cat=Bracelets" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Bracelets & Anklets</Link>
            </li>
            <li>
              <Link to="/new-arrivals" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>New Arrivals</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="site-footer__col">
          <h4>Customer Care</h4>
          <ul>
            <li>
              <Link to="/shipping" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Shipping & Delivery</Link>
            </li>
            <li>
              <Link to="/exchange" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Returns & Exchange</Link>
            </li>
            <li>
              <Link to="/care-guide" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Jewellery Care Guide</Link>
            </li>
            <li>
              <Link to="/track-order" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Track Your Order</Link>
            </li>
            <li>
              <Link to="/faqs" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>FAQs & Help</Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Guarantees & Social */}
        <div className="site-footer__col site-footer__col--features">
          <h4>The VIA Promise</h4>
          <div className="site-footer__trust-list">
            <div className="site-footer__trust-item">
              <span className="site-footer__trust-icon">💧</span>
              <span>Waterproof & Anti-Tarnish</span>
            </div>
            <div className="site-footer__trust-item">
              <span className="site-footer__trust-icon">🌿</span>
              <span>Hypoallergenic & Lead-Free</span>
            </div>
            <div className="site-footer__trust-item">
              <span className="site-footer__trust-icon">🚚</span>
              <span>Free Pan-India Delivery</span>
            </div>
          </div>

          <div className="site-footer__social-section">
            <span className="site-footer__social-label">Connect With Us</span>
            <div className="site-footer__social">
              <a
                href={VIA_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Follow on Instagram"
              >
                <Icon name="photo_camera" />
              </a>
              <a
                href={`https://wa.me/${VIA_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <Icon name="chat" />
              </a>
              <a
                href="mailto:houseofvia2@gmail.com"
                aria-label="Email"
                title="Send an Email"
              >
                <Icon name="mail" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar with Skayon Developer Badge */}
      <div className="site-footer__bottom">
        <p className="site-footer__copy">
          © {new Date().getFullYear()} VIA JEWELLERY. ALL RIGHTS RESERVED.
        </p>

        <div className="site-footer__developer-badge">
          <span className="skaylon-dot"></span>
          <span className="skaylon-text">Website Developed by</span>
          <a
            href="https://skaylon.com"
            target="_blank"
            rel="noreferrer"
            className="skaylon-link"
            title="Skayon - Web Development & Digital Solutions"
          >
            <span className="skaylon-name">SKAYON</span>
            <span className="skaylon-sparkle">🚀</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
