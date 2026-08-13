import { useState } from 'react'
import Icon from '../components/Icon'
import { VIA_WHATSAPP_NUMBER } from '../config'

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'quality', label: 'Quality & Anti-Tarnish' },
  { id: 'shipping', label: 'Shipping & Delivery' },
  { id: 'returns', label: 'Returns & Exchange' },
  { id: 'payment', label: 'Payments & Security' }
]

const FAQS_DATA = [
  {
    cat: 'quality',
    q: 'Is VIA jewellery really 100% anti-tarnish and waterproof?',
    a: 'Yes! Every VIA piece is crafted with high-grade 316L surgical stainless steel and coated with 18K real gold using Physical Vapor Deposition (PVD) vacuum technology. This ensures your jewellery will not oxidize, rust, or lose its radiant shine even when exposed to water, sweat, or daily lotion.'
  },
  {
    cat: 'quality',
    q: 'Will VIA jewellery turn my skin green or cause allergies?',
    a: 'Never. Our jewellery is 100% lead-free, nickel-free, and hypoallergenic. It is specially crafted for sensitive skin types to ensure comfort and zero discoloration.'
  },
  {
    cat: 'quality',
    q: 'Can I wear VIA jewellery in the shower, pool, or gym?',
    a: 'Absolutely! VIA pieces are built for active daily lives. You can wear them while showering, exercising, swimming, or washing dishes with complete confidence.'
  },
  {
    cat: 'shipping',
    q: 'How long does shipping take across India?',
    a: 'Orders shipped to metro cities (Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata) arrive within 2 to 4 business days. Other regions arrive within 4 to 7 business days.'
  },
  {
    cat: 'shipping',
    q: 'Do you offer Free Shipping?',
    a: 'Yes, we offer 100% Free Shipping pan-India on all prepaid orders! Cash on Delivery (COD) is also available across 19,000+ Indian pincodes.'
  },
  {
    cat: 'shipping',
    q: 'How do I get my tracking details?',
    a: 'Once your parcel is dispatched from our fulfillment center, we immediately send live SMS and WhatsApp tracking links. You can also track your shipment anytime on our Track Your Order page.'
  },
  {
    cat: 'returns',
    q: 'What is VIA’s exchange policy?',
    a: 'We offer a hassle-free 15-day exchange policy. If you need a different size or wish to swap your product for another style, simply reach out to our WhatsApp support team and we will arrange a reverse pickup from your doorstep.'
  },
  {
    cat: 'returns',
    q: 'What if I receive a broken or damaged item in transit?',
    a: 'In the rare event of transit damage, please record a quick unboxing video and share it with us on WhatsApp or email (houseofvia2@gmail.com) within 48 hours. We will dispatch a brand new replacement immediately at zero extra cost.'
  },
  {
    cat: 'payment',
    q: 'What payment options do you support?',
    a: 'We accept UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, Mobikwik, and Cash on Delivery (COD).'
  },
  {
    cat: 'payment',
    q: 'Is it safe to pay online on VIA?',
    a: 'Yes, 100% safe. All online transactions are encrypted via SSL 256-bit bank-grade payment gateways certified by RBI regulations.'
  }
]

export default function FAQs() {
  const [activeTab, setActiveTab] = useState('all')
  const [openIdx, setOpenIdx] = useState(0)

  const filteredFaqs = activeTab === 'all' 
    ? FAQS_DATA 
    : FAQS_DATA.filter(item => item.cat === activeTab)

  const toggleFaq = (index) => {
    setOpenIdx(openIdx === index ? null : index)
  }

  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="help_center" className="icon-sm" /> Clear Answers & Support
        </span>
        <h1 className="info-hero__title">Frequently Asked Questions</h1>
        <p className="info-hero__desc">
          Everything you need to know about VIA anti-tarnish quality, shipping, 15-day exchanges, and payment security.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Category Tabs */}
        <div className="faq-filter-tabs">
          {FAQ_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`faq-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(cat.id)
                setOpenIdx(0)
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  <Icon name="expand_more" className="faq-icon" />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Concierge Box */}
        <div className="concierge-box">
          <h3 className="concierge-box__title">Still Have Questions?</h3>
          <p className="concierge-box__desc">
            Our VIA concierge team is available on WhatsApp and email to assist you with any questions or custom order inquiries.
          </p>
          <div className="concierge-box__btns">
            <a
              href={`https://wa.me/${VIA_WHATSAPP_NUMBER}?text=Hi%20VIA!%20I%20have%20a%20question%20about%20my%20order.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ background: 'var(--gold-gradient)', color: '#000' }}
            >
              <Icon name="chat" className="icon-sm" /> Chat Live on WhatsApp
            </a>
            <a href="mailto:houseofvia2@gmail.com" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Icon name="mail" className="icon-sm" /> Email houseofvia2@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
