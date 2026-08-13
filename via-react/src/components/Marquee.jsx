import { useCMS } from '../context/CMSContext'

export default function Marquee() {
  const { marquee } = useCMS()
  const defaultList = [
    '✨ 100% ANTI-TARNISH GUARANTEE',
    '🛡️ WATERPROOF & SWEATPROOF',
    '🚚 FREE PAN-INDIA EXPRESS SHIPPING ABOVE ₹999',
    '🎁 COMPLIMENTARY GIFT BOX WITH EVERY ORDER',
  ]
  const list = marquee && marquee.length > 0 ? marquee : defaultList

  return (
    <div className="marquee-bar">
      <div className="marquee">
        {[...list, ...list, ...list, ...list].map((msg, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {msg} <span style={{ color: 'var(--secondary)', opacity: 0.6 }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
