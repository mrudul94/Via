import { useState } from 'react'
import Icon from '../components/Icon'
import { VIA_WHATSAPP_NUMBER } from '../config'

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [phone, setPhone] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = (e) => {
    e.preventDefault()
    if (!orderId.trim() && !phone.trim()) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const cleanId = orderId.trim().toUpperCase() || 'VIA-' + Math.floor(100000 + Math.random() * 900000)
      setTrackingData({
        orderId: cleanId.startsWith('VIA-') ? cleanId : `VIA-${cleanId}`,
        status: 'In Transit via Express Courier',
        courier: 'BlueDart Express',
        awb: 'BD' + Math.floor(100000000 + Math.random() * 900000000),
        estimatedDelivery: '2 to 3 Business Days',
        destination: 'India',
        steps: [
          { title: 'Order Confirmed', date: 'Yesterday', completed: true },
          { title: 'Packed in VIA Anti-Tarnish Pouch', date: 'Yesterday', completed: true },
          { title: 'Dispatched from Warehouse', date: 'Today, 09:30 AM', completed: true },
          { title: 'In Transit to Regional Hub', date: 'In Progress', current: true },
          { title: 'Out for Doorstep Delivery', date: 'Pending', completed: false }
        ]
      })
    }, 600)
  }

  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="radar" className="icon-sm" /> Real-Time Package Tracker
        </span>
        <h1 className="info-hero__title">Track Your Order</h1>
        <p className="info-hero__desc">
          Enter your Order ID (e.g., #VIA-84920) or registered phone number below to get real-time tracking status on your package.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Tracking Lookup Box */}
        <div 
          className="info-card" 
          style={{ 
            maxWidth: '640px', 
            margin: '0 auto 48px', 
            padding: '36px', 
            background: 'linear-gradient(180deg, #ffffff 0%, var(--surface-container-low) 100%)',
            border: '1px solid var(--outline-variant)'
          }}
        >
          <form onSubmit={handleTrack} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px' }}>
                Order ID Number
              </label>
              <input
                type="text"
                placeholder="e.g. VIA-84920"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid var(--outline-variant)',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#ffffff'
                }}
              />
            </div>

            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--on-surface-variant)', fontWeight: '600' }}>OR</div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px' }}>
                Registered Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid var(--outline-variant)',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#ffffff'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: 'var(--gold-gradient)',
                color: '#000',
                fontWeight: '700',
                fontSize: '13px',
                letterSpacing: '0.15em',
                borderRadius: '30px',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              {loading ? 'LOOKING UP TRACKING...' : 'TRACK SHIPMENT STATUS'}
            </button>
          </form>

          {/* Quick WhatsApp Tracker CTA */}
          <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed var(--outline-variant)' }}>
            <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', marginBottom: '10px' }}>
              Want instant tracking directly on WhatsApp?
            </p>
            <a
              href={`https://wa.me/${VIA_WHATSAPP_NUMBER}?text=Hi%20VIA!%20Please%20send%20me%20the%20tracking%20update%20for%20my%20order.`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#10b981',
                fontWeight: '700',
                fontSize: '13px',
                textDecoration: 'none'
              }}
            >
              <Icon name="chat" className="icon-sm" /> Track Instantly via WhatsApp Concierge →
            </a>
          </div>
        </div>

        {/* Tracking Result View */}
        {trackingData && (
          <div className="info-card" style={{ maxWidth: '720px', margin: '0 auto 48px', padding: '36px', borderColor: 'var(--secondary)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '16px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--secondary)', textTransform: 'uppercase' }}>Shipment Found</span>
                <h3 style={{ fontSize: '22px', color: 'var(--primary)', fontFamily: 'var(--font-heritage)' }}>Order {trackingData.orderId}</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>Carrier: <strong>{trackingData.courier}</strong></span>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>AWB: {trackingData.awb}</div>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="step-list">
              {trackingData.steps.map((step, idx) => (
                <div key={idx} className="step-item" style={{ borderColor: step.current ? 'var(--secondary)' : 'var(--outline-variant)' }}>
                  <div 
                    className="step-item__number" 
                    style={{ 
                      background: step.completed || step.current ? 'var(--gold-gradient)' : 'rgba(0,0,0,0.1)',
                      color: step.completed || step.current ? '#000' : 'var(--on-surface-variant)'
                    }}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div className="step-item__content">
                    <h4 className="step-item__title" style={{ color: step.current ? 'var(--secondary)' : 'var(--primary)' }}>
                      {step.title} {step.current && <span style={{ fontSize: '11px', background: 'rgba(197,160,89,0.15)', padding: '2px 8px', borderRadius: '10px', marginLeft: '6px' }}>Current Status</span>}
                    </h4>
                    <p className="step-item__desc">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Banner */}
        <div className="concierge-box">
          <h3 className="concierge-box__title">Need Live Order Assistance?</h3>
          <p className="concierge-box__desc">
            Can’t find your Order ID or need to update your shipping address? Connect directly with our customer care concierge.
          </p>
          <div className="concierge-box__btns">
            <a
              href={`https://wa.me/${VIA_WHATSAPP_NUMBER}?text=Hi%20VIA!%20I%20need%20help%20tracking%20my%20order.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ background: 'var(--gold-gradient)', color: '#000' }}
            >
              <Icon name="chat" className="icon-sm" /> Chat on WhatsApp Concierge
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
