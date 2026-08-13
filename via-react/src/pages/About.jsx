import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const FOUNDERS = [
  {
    name: 'VISMAYA G',
    role: 'Co-Founder & Creative Director',
    handle: '@vismaya_g___',
    url: 'https://instagram.com/vismaya_g___',
    quote:
      'Jewellery shouldn’t be reserved only for special occasions. VIA was created so every woman can feel effortless, refined luxury every single day without worrying about tarnish or fading.',
    initials: 'VG'
  },
  {
    name: 'AJINA RAMACHANDRAN',
    role: 'Co-Founder & Managing Director',
    handle: '@ajinaramachandran',
    url: 'https://instagram.com/ajinaramachandran',
    quote:
      'Our commitment is uncompromised quality, timeless design, and direct-to-customer trust. Every piece in the House of VIA is built to endure daily wear with eternal brilliance.',
    initials: 'AR'
  }
]

const VALUES = [
  {
    icon: 'verified',
    title: '100% Anti-Tarnish',
    desc: 'Engineered with advanced PVD 18K gold plating to prevent discoloration, oxidation, and fading.'
  },
  {
    icon: 'water_drop',
    title: 'Waterproof & Sweatproof',
    desc: 'Wear your favorite pieces in the shower, at the gym, or by the beach with zero color loss.'
  },
  {
    icon: 'health_and_safety',
    title: 'Hypoallergenic & Safe',
    desc: 'Crafted with premium surgical-grade stainless steel — 100% nickel-free and lead-free for sensitive skin.'
  },
  {
    icon: 'card_giftcard',
    title: 'Everyday Luxury',
    desc: 'High-end jewellery aesthetic at accessible direct-to-consumer prices with premium anti-tarnish pouches.'
  }
]

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Header */}
      <section 
        className="about-hero"
        style={{
          background: 'linear-gradient(180deg, var(--primary) 0%, #1a1511 100%)',
          color: '#ffffff',
          padding: '80px 24px 64px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)'
        }}
      >
        <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
          <span style={{ 
            fontSize: '11px', 
            fontWeight: 700, 
            letterSpacing: '0.24em', 
            textTransform: 'uppercase', 
            color: 'var(--secondary-fixed)', 
            display: 'block', 
            marginBottom: '12px' 
          }}>
            ✦ HOUSE OF VIA • OUR HERITAGE
          </span>
          <h1 style={{ 
            fontFamily: 'var(--font-heritage)', 
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
            fontWeight: 600, 
            letterSpacing: '0.04em', 
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            About VIA
          </h1>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: 1.7, 
            color: 'rgba(255, 255, 255, 0.88)', 
            maxWidth: '36rem', 
            margin: '0 auto 24px' 
          }}>
            Everyday luxury anti-tarnish jewellery designed for women who refuse to choose between elegance and durability. Wear your story every single day.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="section section--pad" style={{ background: 'var(--background)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary-text)', display: 'block', marginBottom: '8px' }}>
            THE PHILOSOPHY
          </span>
          <h2 className="section__title" style={{ fontFamily: 'var(--font-heritage)', marginBottom: '20px' }}>
            Jewellery That Doesn’t Quit On You
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--on-surface-variant)', marginBottom: '24px' }}>
            Traditional fine gold can be delicate, while cheap fashion jewellery tarnishes after a few wears. VIA bridges the gap with high-durability, anti-tarnish 18K gold plated pieces crafted for daily wear. Whether you are working, swimming, working out, or celebrating special moments, VIA stays brilliant.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section 
        className="section section--pad" 
        style={{ 
          background: 'var(--surface-container-low)', 
          borderTop: '1px solid var(--outline-variant)',
          borderBottom: '1px solid var(--outline-variant)'
        }}
      >
        <div className="section__head" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--secondary-text)', display: 'block', marginBottom: '8px' }}>
            VISIONARIES &amp; LEADERSHIP
          </span>
          <h2 className="section__title" style={{ fontFamily: 'var(--font-heritage)' }}>
            Meet The Founders
          </h2>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '15px', maxWidth: '32rem', margin: '8px auto 0' }}>
            The creative minds shaping the modern era of anti-tarnish everyday luxury jewellery.
          </p>
        </div>

        <div className="founder-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '32px',
          maxWidth: '56rem',
          margin: '0 auto'
        }}>
          {FOUNDERS.map((founder, i) => (
            <div
              key={i}
              className="founder-card"
              style={{
                background: '#ffffff', 
                borderRadius: 'var(--radius-xl)', 
                padding: '36px 28px', 
                border: '1px solid var(--outline-variant)', 
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {/* Founder Avatar Badge */}
              <div 
                style={{ 
                  width: '84px', 
                  height: '84px', 
                  borderRadius: '50%', 
                  background: 'var(--primary)', 
                  color: 'var(--secondary-fixed)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heritage)',
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  marginBottom: '20px',
                  border: '2px solid var(--secondary)',
                  boxShadow: 'var(--shadow-gold)'
                }}
              >
                {founder.initials}
              </div>

              <h3 style={{ fontFamily: 'var(--font-heritage)', fontSize: '22px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                {founder.name}
              </h3>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary-text)', marginBottom: '16px' }}>
                {founder.role}
              </p>

              <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--on-surface-variant)', fontStyle: 'italic', marginBottom: '24px', flexGrow: 1 }}>
                “{founder.quote}”
              </p>

              <a 
                href={founder.url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn--outline"
                style={{ 
                  fontSize: '11px', 
                  padding: '10px 20px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                <Icon name="photo_camera" style={{ fontSize: '16px' }} />
                <span>{founder.handle}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="section section--pad" style={{ background: 'var(--background)' }}>
        <div className="section__head" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary-text)', display: 'block', marginBottom: '8px' }}>
            UNCOMPROMISED STANDARDS
          </span>
          <h2 className="section__title" style={{ fontFamily: 'var(--font-heritage)' }}>
            Why Choose VIA
          </h2>
        </div>

        <div className="value-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: '24px',
          maxWidth: '64rem',
          margin: '0 auto'
        }}>
          {VALUES.map((val, i) => (
            <div
              key={i}
              className="value-card"
              style={{
                background: '#ffffff', 
                padding: '28px 20px', 
                borderRadius: 'var(--radius-lg)', 
                border: '1px solid var(--outline-variant)', 
                textAlign: 'center' 
              }}
            >
              <div 
                style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '50%', 
                  background: 'var(--surface-container-low)', 
                  border: '1px solid rgba(212, 175, 55, 0.3)', 
                  color: 'var(--secondary-text)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <Icon name={val.icon} style={{ fontSize: '26px' }} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-heritage)', fontSize: '16px', fontWeight: 600, color: 'var(--primary)', marginBottom: '8px' }}>
                {val.title}
              </h4>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--on-surface-variant)' }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section 
        style={{ 
          background: 'var(--primary)', 
          color: '#ffffff', 
          padding: '64px 24px', 
          textAlign: 'center',
          borderTop: '1px solid rgba(212, 175, 55, 0.25)' 
        }}
      >
        <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heritage)', fontSize: '28px', fontWeight: 600, color: '#ffffff', marginBottom: '16px' }}>
            Ready to Experience VIA?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.82)', marginBottom: '28px' }}>
            Explore our curated anti-tarnish necklaces, earrings, bangles, and rings built for everyday grace.
          </p>
          <Link to="/shop" className="btn btn--gold">
            Explore All Collections →
          </Link>
        </div>
      </section>
    </div>
  )
}
