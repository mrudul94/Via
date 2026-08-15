import { Link } from 'react-router-dom'
import Icon from './Icon'
import { VIA_WHATSAPP_NUMBER, VIA_INSTAGRAM } from '../config'

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
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
