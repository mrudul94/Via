import { useState } from 'react'
import Icon from '../components/Icon'
import { useToast } from '../context/ToastContext'
import { VIA_WHATSAPP_NUMBER, VIA_INSTAGRAM } from '../config'

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Orders are processed within 24-48 hours. Pan-India Express shipping typically delivers within 3–5 business days. Shipping is FREE on all orders above ₹999.'
  },
  {
    q: 'Are VIA jewellery pieces really 100% waterproof and sweatproof?',
    a: 'Yes! All VIA pieces feature premium PVD 18K gold plating over surgical stainless steel. You can wear them daily — in the shower, at the gym, or by the beach — without fading or tarnishing.'
  },
  {
    q: 'Can I order directly on WhatsApp?',
    a: 'Absolutely! Click the "WhatsApp Us" button to send us a screenshot of your favorite items for instant order confirmation and personal styling assistance.'
  },
  {
    q: 'What is your exchange and return policy?',
    a: 'We offer easy replacements for damaged or defective items reported within 7 days of delivery with an unboxing video. Your satisfaction is our priority.'
  }
]

export default function Contact() {
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast('Please fill in all required fields.')
      return
    }
    setSubmitted(true)
    toast('Thank you! Your message has been sent successfully.')
  }

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <section 
        className="contact-hero"
        style={{
          background: 'linear-gradient(180deg, var(--primary) 0%, #1a1511 100%)',
          color: '#ffffff',
          padding: '76px 24px 60px',
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
            ✦ WE'RE HERE FOR YOU • GET IN TOUCH
          </span>
          <h1 style={{ 
            fontFamily: 'var(--font-heritage)', 
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
            fontWeight: 600, 
            letterSpacing: '0.04em', 
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            Contact Us
          </h1>
          <p style={{ 
            fontSize: '15px', 
            lineHeight: 1.65, 
            color: 'rgba(255, 255, 255, 0.85)', 
            maxWidth: '34rem', 
            margin: '0 auto' 
          }}>
            Have questions about an order, sizing, care instructions, or custom jewellery orders? Reach out to us via WhatsApp, email, or social channels.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section section--pad" style={{ background: 'var(--background)' }}>
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: '48px',
          maxWidth: '68rem',
          margin: '0 auto'
        }}>
          {/* Contact Information & Channels */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary-text)', display: 'block', marginBottom: '8px' }}>
              DIRECT CHANNELS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heritage)', fontSize: '28px', fontWeight: 600, color: 'var(--primary)', marginBottom: '24px' }}>
              We'd Love To Hear From You
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {/* WhatsApp Card */}
              <a 
                href={`https://wa.me/${VIA_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="contact-channel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: '#ffffff',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--outline-variant)',
                  boxShadow: 'var(--shadow-sm)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.25s ease, border-color 0.25s ease'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#25D366', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="chat" style={{ fontSize: '24px' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontFamily: 'var(--font-heritage)', fontSize: '16px', fontWeight: 600, color: 'var(--primary)', marginBottom: '2px' }}>
                    Instant WhatsApp Support
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
                    +91 8075915386 — Fast response for orders &amp; queries
                  </p>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#25D366', textTransform: 'uppercase' }}>
                    Click to Chat Now →
                  </span>
                </div>
              </a>

              {/* Instagram Card */}
              <a 
                href={VIA_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="contact-channel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: '#ffffff',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--outline-variant)',
                  boxShadow: 'var(--shadow-sm)',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--secondary-fixed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="photo_camera" style={{ fontSize: '24px' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontFamily: 'var(--font-heritage)', fontSize: '16px', fontWeight: 600, color: 'var(--primary)', marginBottom: '2px' }}>
                    Official Instagram
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
                    @house_of_via___
                  </p>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--secondary-text)', textTransform: 'uppercase' }}>
                    Follow Us for New Drops →
                  </span>
                </div>
              </a>

              {/* Founders Contact Info */}
              <div style={{ background: 'var(--surface-container-low)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--outline-variant)' }}>
                <h4 style={{ fontFamily: 'var(--font-heritage)', fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Founder Channels
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px' }}>
                  <a href="https://instagram.com/vismaya_g___" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                    Vismaya G (@vismaya_g___)
                  </a>
                  <span>•</span>
                  <a href="https://instagram.com/ajinaramachandran" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                    Ajina Ramachandran (@ajinaramachandran)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Box */}
          <div className="contact-form-card" style={{ background: '#ffffff', padding: '36px 28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--outline-variant)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontFamily: 'var(--font-heritage)', fontSize: '22px', fontWeight: 600, color: 'var(--primary)', marginBottom: '8px' }}>
              Send Us A Message
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', marginBottom: '24px' }}>
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div style={{ background: 'var(--surface-container-low)', padding: '32px 20px', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--secondary)' }}>
                <Icon name="check_circle" style={{ fontSize: '44px', color: 'var(--secondary)', marginBottom: '12px' }} />
                <h4 style={{ fontFamily: 'var(--font-heritage)', fontSize: '20px', color: 'var(--primary)', marginBottom: '8px' }}>
                  Message Received!
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>
                  Thank you for reaching out. We will reply to your email or WhatsApp message shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn btn--outline"
                  style={{ marginTop: '20px', fontSize: '11px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ENTER YOUR FULL NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="box-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="NAME@EXAMPLE.COM"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="box-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '6px' }}>
                    Phone / WhatsApp Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="box-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '6px' }}>
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="box-input"
                    style={{ background: '#ffffff', cursor: 'pointer' }}
                  >
                    <option value="General Question">General Inquiry</option>
                    <option value="Order Status">Order Status &amp; Tracking</option>
                    <option value="Custom Order">Custom Jewellery Request</option>
                    <option value="Care & Exchange">Exchange &amp; Care Support</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '6px' }}>
                    Message *
                  </label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="HOW CAN WE HELP YOU?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="box-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn--primary" style={{ marginTop: '8px' }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section 
        className="section section--pad" 
        style={{ 
          background: 'var(--surface-container-low)', 
          borderTop: '1px solid var(--outline-variant)' 
        }}
      >
        <div className="section__head" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary-text)', display: 'block', marginBottom: '8px' }}>
            GOT QUESTIONS?
          </span>
          <h2 className="section__title" style={{ fontFamily: 'var(--font-heritage)' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ maxWidth: '44rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="faq-item"
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)', 
                border: '1px solid var(--outline-variant)', 
                padding: '16px 20px', 
                cursor: 'pointer' 
              }}
            >
              <summary style={{ fontSize: '15px', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-heritage)' }}>
                {faq.q}
              </summary>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--on-surface-variant)', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--outline-variant)' }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
