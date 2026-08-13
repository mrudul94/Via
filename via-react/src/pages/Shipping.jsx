import Icon from '../components/Icon'
import { VIA_WHATSAPP_NUMBER } from '../config'

export default function Shipping() {
  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="local_shipping" className="icon-sm" /> Nationwide Express Delivery
        </span>
        <h1 className="info-hero__title">Shipping & Delivery</h1>
        <p className="info-hero__desc">
          Every VIA creation is dispatched with utmost care, secured anti-tarnish packaging, and insured courier delivery directly to your doorstep.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Highlight Cards */}
        <div className="info-grid-3">
          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="bolt" />
            </div>
            <h3 className="info-card__title">24-Hour Dispatch</h3>
            <p className="info-card__text">
              Orders placed before 2 PM IST are processed and handed over to our courier partners within 24 hours on business days.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="card_giftcard" />
            </div>
            <h3 className="info-card__title">Signature Packaging</h3>
            <p className="info-card__text">
              Each piece arrives inside our custom microfiber anti-tarnish pouch & protective luxury box, perfect for gifting or safe keeping.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="verified_user" />
            </div>
            <h3 className="info-card__title">Insured Transit</h3>
            <p className="info-card__text">
              All shipments are 100% insured. In the rare event of transit damage or loss, a replacement is sent immediately.
            </p>
          </div>
        </div>

        {/* Timelines Section */}
        <section className="info-section">
          <h2 className="info-section__title">Delivery Timelines & Charges</h2>
          <div className="step-list">
            <div className="step-item">
              <div className="step-item__number">1</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Metro Cities (Express Delivery) — 2 to 4 Business Days</h4>
                <p className="step-item__desc">
                  Deliveries to major hubs like Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Kolkata, and Kochi typically arrive within 48-96 hours.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">2</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Rest of India — 4 to 7 Business Days</h4>
                <p className="step-item__desc">
                  Standard delivery to tier 2/3 cities and regional pincodes takes 4 to 7 working days depending on local postal accessibility.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">3</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Free Pan-India Delivery</h4>
                <p className="step-item__desc">
                  We offer <strong>100% Free Shipping</strong> across India for prepaid orders. Cash on Delivery (COD) is available with a nominal verification fee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logistics Partners */}
        <section className="info-section">
          <h2 className="info-section__title">Trusted Logistics Partners</h2>
          <p className="info-card__text" style={{ fontSize: '15px', marginBottom: '24px' }}>
            We partner with India’s leading express courier networks to ensure swift and reliable delivery:
          </p>
          <div className="info-grid-2">
            <div className="info-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: '700' }}>Express Carriers</h4>
              <p className="info-card__text">BlueDart • Delhivery • Expressbees • DTDC • India Post Speed Post</p>
            </div>
            <div className="info-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: '700' }}>Live Tracking Updates</h4>
              <p className="info-card__text">SMS & WhatsApp tracking alerts are dispatched as soon as your parcel ships.</p>
            </div>
          </div>
        </section>

        {/* Concierge Box */}
        <div className="concierge-box">
          <h3 className="concierge-box__title">Need Urgent Delivery?</h3>
          <p className="concierge-box__desc">
            Have a special anniversary, birthday, or event coming up? Contact our WhatsApp concierge for priority express dispatch options!
          </p>
          <div className="concierge-box__btns">
            <a
              href={`https://wa.me/${VIA_WHATSAPP_NUMBER}?text=Hi%20VIA!%20I%20need%20urgent%20express%20delivery%20for%20my%20order.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ background: 'var(--gold-gradient)', color: '#000' }}
            >
              <Icon name="chat" className="icon-sm" /> Chat on WhatsApp
            </a>
            <a href="mailto:houseofvia2@gmail.com" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Icon name="mail" className="icon-sm" /> Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
