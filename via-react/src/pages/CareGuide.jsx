import Icon from '../components/Icon'
import { VIA_WHATSAPP_NUMBER } from '../config'

export default function CareGuide() {
  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="auto_awesome" className="icon-sm" /> 18K Anti-Tarnish Craftsmanship
        </span>
        <h1 className="info-hero__title">Jewellery Care Guide</h1>
        <p className="info-hero__desc">
          VIA pieces are engineered with advanced PVD 18K Gold Vacuum Plating over surgical stainless steel — built for daily wear, water resistance, and lasting luster.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Anti-Tarnish Science */}
        <div className="info-grid-3">
          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="water_drop" />
            </div>
            <h3 className="info-card__title">100% Waterproof</h3>
            <p className="info-card__text">
              Wear your VIA pieces in the shower, pool, or gym. PVD gold vacuum coating fuses gold molecules deep into the steel base.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="health_and_safety" />
            </div>
            <h3 className="info-card__title">Hypoallergenic Core</h3>
            <p className="info-card__text">
              100% nickel-free and lead-free 316L stainless steel base prevents green skin stains, skin redness, or allergic reactions.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="clean_hands" />
            </div>
            <h3 className="info-card__title">Low Maintenance</h3>
            <p className="info-card__text">
              Unlike traditional brass or sterling silver that oxidizes, VIA anti-tarnish jewellery requires minimal upkeep to shine forever.
            </p>
          </div>
        </div>

        {/* Do's and Don'ts */}
        <section className="info-section">
          <h2 className="info-section__title">Daily Wear Guidelines</h2>
          <div className="info-grid-2">
            <div className="info-card" style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '700', fontSize: '18px' }}>
                <Icon name="check_circle" /> DO’S
              </div>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
                <li><strong>Wear everyday:</strong> Perfect for showers, working out, and daily routines.</li>
                <li><strong>Wipe clean:</strong> Gently polish with a dry microfiber cloth after wearing.</li>
                <li><strong>Store separately:</strong> Keep pieces inside your VIA velvet pouch to prevent metal-on-metal friction.</li>
                <li><strong>Rinse off saltwater:</strong> After ocean swims, rinse with fresh water and pat dry.</li>
              </ul>
            </div>

            <div className="info-card" style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: '700', fontSize: '18px' }}>
                <Icon name="cancel" /> DON’TS
              </div>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
                <li><strong>Harsh chemicals:</strong> Avoid direct spray of concentrated bleach or acetone.</li>
                <li><strong>Abrasive scrubbers:</strong> Do not scrub with harsh scouring pads or metal wire brushes.</li>
                <li><strong>Tangled storage:</strong> Avoid tossing unclasped chains together in a drawer.</li>
                <li><strong>Extreme impacts:</strong> Avoid dropping delicate cubic zirconia stones on hard stone floors.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cleaning Instructions */}
        <section className="info-section">
          <h2 className="info-section__title">Quick 3-Step Cleaning Routine</h2>
          <div className="step-list">
            <div className="step-item">
              <div className="step-item__number">1</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 1: Lukewarm Water Bath</h4>
                <p className="step-item__desc">
                  Fill a bowl with lukewarm water and add 1-2 drops of mild dish soap. Submerge your pieces for 2 minutes to loosen dirt or lotion buildup.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">2</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 2: Soft Microfiber Buff</h4>
                <p className="step-item__desc">
                  Gently wipe with a soft microfiber jewelry cloth or soft bristle brush around stone settings and chain links.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">3</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 3: Air Dry & Pouch Storage</h4>
                <p className="step-item__desc">
                  Pat thoroughly dry with a clean towel and store back in your VIA signature anti-tarnish pouch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Concierge Box */}
        <div className="concierge-box">
          <h3 className="concierge-box__title">Have Questions About Jewellery Care?</h3>
          <p className="concierge-box__desc">
            Our team is always here to provide expert care tips or assist with anti-tarnish warranty queries.
          </p>
          <div className="concierge-box__btns">
            <a
              href={`https://wa.me/${VIA_WHATSAPP_NUMBER}?text=Hi%20VIA!%20I%20have%20a%20question%20about%20jewellery%20care.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ background: 'var(--gold-gradient)', color: '#000' }}
            >
              <Icon name="chat" className="icon-sm" /> Ask Care Concierge on WhatsApp
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
