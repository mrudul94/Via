export default function TrustBadge({ freeShippingThreshold = 999 }) {
  return (
    <div
      className="trust-badge-strip"
      style={{
        background: 'linear-gradient(180deg, #1e1712 0%, #14100c 100%)',
        color: '#ffffff',
        padding: '26px var(--page-x)',
        borderTop: '1px solid rgba(212, 175, 55, 0.3)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="trust-badge-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: '20px',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--secondary)', padding: '8px', borderRadius: '50%', fontSize: '15px', border: '1px solid rgba(212, 175, 55, 0.35)' }}>🪷</span>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--secondary-fixed)' }}>
            Everyday Luxury Crafted
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--secondary)', padding: '8px', borderRadius: '50%', fontSize: '15px', border: '1px solid rgba(212, 175, 55, 0.35)' }}>✨</span>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--secondary-fixed)' }}>
            100% Anti-Tarnish Guarantee
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--secondary)', padding: '8px', borderRadius: '50%', fontSize: '15px', border: '1px solid rgba(212, 175, 55, 0.35)' }}>🛡️</span>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--secondary-fixed)' }}>
            Waterproof &amp; Sweatproof
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--secondary)', padding: '8px', borderRadius: '50%', fontSize: '15px', border: '1px solid rgba(212, 175, 55, 0.35)' }}>🚚</span>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--secondary-fixed)' }}>
            Free Shipping above ₹{freeShippingThreshold}
          </p>
        </div>
      </div>
    </div>
  )
}
