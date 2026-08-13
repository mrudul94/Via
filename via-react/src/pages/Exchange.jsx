import Icon from '../components/Icon'
import { VIA_WHATSAPP_NUMBER } from '../config'

export default function Exchange() {
  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="published_with_changes" className="icon-sm" /> Customer Happiness Guarantee
        </span>
        <h1 className="info-hero__title">Returns & Exchange</h1>
        <p className="info-hero__desc">
          Your complete satisfaction is our highest priority. We offer a seamless 15-day exchange policy to ensure you love every piece in your VIA collection.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Core Pillars */}
        <div className="info-grid-3">
          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="event_repeat" />
            </div>
            <h3 className="info-card__title">15-Day Exchange Window</h3>
            <p className="info-card__text">
              If a ring size isn’t right or you want to swap for another design, you can request an exchange within 15 days of package delivery.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="home_repair_service" />
            </div>
            <h3 className="info-card__title">Doorstep Reverse Pickup</h3>
            <p className="info-card__text">
              We arrange hassle-free reverse pickup right from your home address across 19,000+ pincodes in India.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="shield" />
            </div>
            <h3 className="info-card__title">Damaged Item Replacement</h3>
            <p className="info-card__text">
              Received a piece damaged during transit? We offer a 100% instant free replacement upon sharing a short unboxing video.
            </p>
          </div>
        </div>

        {/* How To Exchange Steps */}
        <section className="info-section">
          <h2 className="info-section__title">Easy 3-Step Exchange Process</h2>
          <div className="step-list">
            <div className="step-item">
              <div className="step-item__number">1</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 1: Contact Concierge Support</h4>
                <p className="step-item__desc">
                  Message us on WhatsApp at <strong>+{VIA_WHATSAPP_NUMBER}</strong> or email <strong>houseofvia2@gmail.com</strong> with your Order ID, product photo, and reason for exchange.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">2</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 2: Reverse Pickup Handover</h4>
                <p className="step-item__desc">
                  Once approved, our logistics team schedules a doorstep pickup within 24-48 hours. Please pack the item securely in its original VIA pouch & box.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">3</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 3: Fresh Replacement Dispatched</h4>
                <p className="step-item__desc">
                  Upon quality inspection at our warehouse, your replacement product or store credit voucher is issued immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms & Guidelines */}
        <section className="info-section">
          <h2 className="info-section__title">Exchange Guidelines & Terms</h2>
          <div className="info-grid-2">
            <div className="info-card">
              <h4 style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: '700' }}>Eligible Items</h4>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
                <li>Unused items in original, unworn condition</li>
                <li>Items returned inside original VIA pouch & box</li>
                <li>Size swaps for rings and bracelets</li>
                <li>Manufacturing defect reported within 48 hours</li>
              </ul>
            </div>

            <div className="info-card">
              <h4 style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: '700' }}>Non-Eligible Items</h4>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
                <li>Items showing visible physical wear, scratch, or alter</li>
                <li>Customized / engraved personalized items</li>
                <li>Items requested beyond the 15-day policy window</li>
                <li>Final clearance sale items marked non-returnable</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Concierge Box */}
        <div className="concierge-box">
          <h3 className="concierge-box__title">Ready to Request an Exchange?</h3>
          <p className="concierge-box__desc">
            Our support team is online to assist you right away. Click below to start your request in seconds.
          </p>
          <div className="concierge-box__btns">
            <a
              href={`https://wa.me/${VIA_WHATSAPP_NUMBER}?text=Hi%20VIA!%20I%20would%20like%20to%20exchange%20an%20item%20from%20my%20order.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ background: 'var(--gold-gradient)', color: '#000' }}
            >
              <Icon name="chat" className="icon-sm" /> Initiate Exchange on WhatsApp
            </a>
            <a href="mailto:houseofvia2@gmail.com" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Icon name="mail" className="icon-sm" /> Email Support Team
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
