import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useCMS } from '../context/CMSContext'
import { formatINR } from '../utils/format'
import { whatsappService } from '../services/whatsappService'

export default function BuyNowCheckout() {
  const { productId } = useParams()
  const [searchParams] = useSearchParams()
  const { findProduct, isLoading } = useCMS()

  // 1. Sanitize Quantity: Integer between 1 and 10, default 1
  const rawQty = searchParams.get('qty')
  const parsedQty = parseInt(rawQty, 10)
  const initialQty = isNaN(parsedQty) || parsedQty < 1 ? 1 : Math.min(parsedQty, 10)

  // 2. Sanitize Variant
  const rawVariant = searchParams.get('variant')
  const initialVariant = rawVariant ? decodeURIComponent(rawVariant) : ''

  const product = findProduct(productId)

  const [qty, setQty] = useState(initialQty)
  const [selectedVariant, setSelectedVariant] = useState(initialVariant)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEnquiryBox, setShowEnquiryBox] = useState(false)
  const [enquiryNote, setEnquiryNote] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    note: '',
  })

  const [errors, setErrors] = useState({})

  // Update document title & validate initial variant against product variant list if present
  useEffect(() => {
    if (product) {
      document.title = `Express Checkout — ${product.name} | VIA`
      if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
        if (!initialVariant || !product.variants.includes(initialVariant)) {
          setSelectedVariant(product.variants[0])
        }
      }
    }
  }, [product, initialVariant])

  // Loading Skeleton State
  if (isLoading) {
    return (
      <section className="section section--pad" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="insta-spinner" style={{ width: '40px', height: '40px', marginBottom: '16px' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading express checkout details...</p>
      </section>
    )
  }

  // Product Unavailable / Out of Stock / Missing State
  const numericPrice = product ? Number(product.price) : 0
  const isInvalidPrice = isNaN(numericPrice) || numericPrice <= 0
  const isUnavailable = !product || product.is_active === false || isInvalidPrice

  if (isUnavailable) {
    return (
      <section className="section section--pad" style={{ textAlign: 'center', minHeight: '55vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}>
        <div style={{ padding: '24px', background: 'rgba(220, 39, 67, 0.1)', border: '1px solid rgba(220, 39, 67, 0.3)', borderRadius: '16px', maxWidth: '480px', width: '100%' }}>
          <Icon name="error_outline" style={{ fontSize: '40px', color: '#ff5f56', marginBottom: '12px' }} />
          <h1 style={{ fontFamily: 'var(--font-heritage)', fontSize: '1.6rem', marginBottom: '8px', color: '#ffffff' }}>
            Product Unavailable
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
            {!product
              ? 'No product matches this item ID in the active catalog.'
              : isInvalidPrice
              ? 'Invalid pricing configuration. Direct ordering is disabled for this item.'
              : 'This product is currently out of stock or unavailable for direct purchase.'}
          </p>
          <Link to="/shop" className="btn btn--primary">
            Browse Active Catalog &rarr;
          </Link>
        </div>
      </section>
    )
  }

  const hasDiscount = product.compareAt && Number(product.compareAt) > numericPrice
  const discountPct = hasDiscount ? Math.round(((Number(product.compareAt) - numericPrice) / Number(product.compareAt)) * 100) : 0
  const subtotalAmount = numericPrice * qty
  const subtotalFormatted = formatINR(subtotalAmount)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name'
    }
    if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number'
    }
    if (!form.address.trim() || form.address.trim().length < 5) {
      newErrors.address = 'Please enter a detailed delivery address'
    }
    if (!form.district.trim() || form.district.trim().length < 2) {
      newErrors.district = 'Please enter your district/city'
    }
    if (!form.state.trim() || form.state.trim().length < 2) {
      newErrors.state = 'Please enter your state'
    }
    if (!/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code'
    }
    if (product.variants && Array.isArray(product.variants) && product.variants.length > 0 && !selectedVariant) {
      newErrors.variant = 'Please select a variant'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrderOnWhatsApp = (e) => {
    e.preventDefault()
    if (isSubmitting) return

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Build WhatsApp order URL using centralized builder
    const waUrl = whatsappService.buildBuyNowOrderMessage({
      product,
      quantity: qty,
      variant: selectedVariant,
      customer: form,
      totalFormatted: subtotalFormatted,
    })

    window.open(waUrl, '_blank')

    // Debounce lock for 2 seconds to prevent duplicate windows
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  const handleSendEnquiry = (e) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    const waUrl = whatsappService.buildBuyNowEnquiryMessage({
      product,
      enquiryNote,
    })

    window.open(waUrl, '_blank')
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <section className="section section--pad checkout" style={{ paddingBottom: 'calc(40px + env(safe-area-inset-bottom))' }}>
      <div className="checkout-badge" style={{ marginBottom: '24px', background: 'rgba(197, 160, 89, 0.08)', border: '1px solid rgba(197, 160, 89, 0.25)' }}>
        <Icon name="flash_on" className="checkout-badge__icon" style={{ color: 'var(--secondary)' }} />
        <div>
          <p className="checkout-badge__title" style={{ color: 'var(--secondary)' }}>EXPRESS 1-ITEM CHECKOUT</p>
          <p className="checkout-badge__text">
            Independent Buy Now flow — placing this order on WhatsApp does not affect your current shopping bag.
          </p>
        </div>
      </div>

      <div className="checkout-grid">
        {/* Left Column: Delivery Form */}
        <div className="checkout-form-wrapper">
          <form className="checkout-form" onSubmit={handlePlaceOrderOnWhatsApp}>
            <section className="checkout-box">
              <h2>DELIVERY & CONTACT DETAILS</h2>
              <div className="address-grid">
                <div className="address-grid__full">
                  <label className="field-label">NAME *</label>
                  <input
                    className={`line-input${errors.fullName ? ' is-invalid' : ''}`}
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    style={{ fontSize: '16px' }}
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="address-grid__full">
                  <label className="field-label">PHONE NUMBER *</label>
                  <input
                    className={`line-input${errors.phone ? ' is-invalid' : ''}`}
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    style={{ fontSize: '16px' }}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>

                <div className="address-grid__full">
                  <label className="field-label">DELIVERY ADDRESS *</label>
                  <input
                    className={`line-input${errors.address ? ' is-invalid' : ''}`}
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder="House, street and area"
                    style={{ fontSize: '16px' }}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>

                <div>
                  <label className="field-label">CITY / DISTRICT *</label>
                  <input
                    className={`line-input${errors.district ? ' is-invalid' : ''}`}
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleInputChange}
                    placeholder="Your city or district"
                    style={{ fontSize: '16px' }}
                  />
                  {errors.district && <span className="field-error">{errors.district}</span>}
                </div>

                <div>
                  <label className="field-label">STATE *</label>
                  <input
                    className={`line-input${errors.state ? ' is-invalid' : ''}`}
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleInputChange}
                    placeholder="Your state"
                    style={{ fontSize: '16px' }}
                  />
                  {errors.state && <span className="field-error">{errors.state}</span>}
                </div>

                <div className="address-grid__full">
                  <label className="field-label">PIN CODE *</label>
                  <input
                    className={`line-input${errors.pincode ? ' is-invalid' : ''}`}
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    style={{ fontSize: '16px' }}
                  />
                  {errors.pincode && <span className="field-error">{errors.pincode}</span>}
                </div>

                <div className="address-grid__full">
                  <label className="field-label">ORDER NOTE (OPTIONAL)</label>
                  <input
                    className="line-input"
                    type="text"
                    name="note"
                    value={form.note}
                    onChange={handleInputChange}
                    placeholder="Add a note or gift message"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>
            </section>

            {/* Price & Availability Disclaimer Banner */}
            <div className="checkout-note" style={{ background: 'rgba(197, 160, 89, 0.1)', border: '1px solid rgba(197, 160, 89, 0.4)', marginTop: '20px', padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon name="verified" style={{ color: '#8c6b27', fontSize: '20px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#3d352e', lineHeight: '1.5', margin: 0 }}>
                <strong style={{ color: '#111111', fontWeight: 700 }}>Note:</strong> Price and availability will be confirmed on WhatsApp before payment.
              </p>
            </div>

            {/* Main Primary Action Button */}
            <button
              type="submit"
              className="btn btn--primary btn--block btn--tall"
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              <Icon name="chat" /> {isSubmitting ? 'Opening WhatsApp...' : 'Place Order on WhatsApp'}
            </button>

            {/* Secondary Action: Toggle Enquiry Drawer */}
            <button
              type="button"
              className="btn btn--outline btn--block"
              style={{ marginTop: '12px' }}
              onClick={() => setShowEnquiryBox((prev) => !prev)}
            >
              <Icon name="help_outline" className="icon-sm" /> Have a Question? Enquire on WhatsApp
            </button>

            {/* Quick Enquiry Box */}
            {showEnquiryBox && (
              <div style={{ marginTop: '16px', padding: '16px', background: 'var(--surface-container-low, #f8f6f0)', borderRadius: '12px', border: '1px solid rgba(197, 160, 89, 0.3)' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-dark, #8c6b27)', marginBottom: '8px' }}>
                  Ask a Question About {product.name}
                </p>
                <textarea
                  className="line-input"
                  rows={2}
                  value={enquiryNote}
                  onChange={(e) => setEnquiryNote(e.target.value)}
                  placeholder="e.g. Is this necklace anti-tarnish in seawater?"
                  style={{ width: '100%', resize: 'none', fontSize: '14px', marginBottom: '12px' }}
                />
                <button
                  type="button"
                  className="btn btn--muted btn--block"
                  disabled={isSubmitting}
                  onClick={handleSendEnquiry}
                  style={{ fontSize: '12px', padding: '10px' }}
                >
                  Send Enquiry via WhatsApp &rarr;
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Product Summary Card */}
        <aside className="checkout-summary">
          <div className="checkout-summary__box">
            <h2>ITEM SUMMARY</h2>
            <div className="checkout-item" style={{ padding: '16px 0', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <div className="checkout-item__img" style={{ width: '72px', height: '72px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="checkout-item__info">
                <div>
                  <h3 className="checkout-item__name" style={{ fontFamily: 'var(--font-heritage)', fontSize: '1.1rem', color: 'var(--primary, #111111)' }}>
                    {product.name}
                  </h3>
                  <p className="checkout-item__cat" style={{ fontSize: '11px', color: 'var(--secondary-dark, #8c6b27)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {product.category}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary, #111111)' }}>{formatINR(numericPrice)}</span>
                  {hasDiscount && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant, #766d63)', textDecoration: 'line-through' }}>
                      {formatINR(product.compareAt)}
                    </span>
                  )}
                  {discountPct > 0 && (
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', background: 'rgba(211, 47, 47, 0.1)', color: '#d32f2f', borderRadius: '4px' }}>
                      -{discountPct}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Stepper Selector (Bounded 1 - 10) */}
            <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--surface-container-low, #f8f6f0)', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-dark, #8c6b27)', letterSpacing: '0.08em' }}>QUANTITY</span>
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  <Icon name="remove" className="icon-sm" />
                </button>
                <input type="text" value={qty} readOnly style={{ width: '36px', textAlign: 'center', fontWeight: 700, color: 'var(--primary, #111111)' }} />
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  disabled={qty >= 10}
                  aria-label="Increase quantity"
                >
                  <Icon name="add" className="icon-sm" />
                </button>
              </div>
            </div>

            {/* Variant Selector (if product variants exist) */}
            {product.variants && Array.isArray(product.variants) && product.variants.length > 0 && (
              <div style={{ marginBottom: '16px', padding: '12px 14px', background: 'var(--surface-container-low, #f8f6f0)', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                <label className="field-label" style={{ marginBottom: '8px', display: 'block' }}>SELECT VARIANT *</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`btn ${selectedVariant === v ? 'btn--primary' : 'btn--outline'}`}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {errors.variant && <span className="field-error" style={{ marginTop: '6px' }}>{errors.variant}</span>}
              </div>
            )}

            {/* Totals Breakdown */}
            <div className="checkout-totals" style={{ marginTop: '16px' }}>
              <div className="checkout-totals__line">
                <span>ITEM PRICE</span>
                <span>{formatINR(numericPrice)} x {qty}</span>
              </div>
              <div className="checkout-totals__line">
                <span>DELIVERY</span>
                <span className="checkout-totals__free">EXPRESS (FREE ABOVE ₹999)</span>
              </div>
              <div className="checkout-totals__line checkout-totals__grand" style={{ borderTop: '1px solid var(--outline-variant, rgba(197, 160, 89, 0.2))', paddingTop: '12px' }}>
                <span>ESTIMATED TOTAL</span>
                <span style={{ color: 'var(--secondary-dark, #8c6b27)', fontSize: '1.3rem', fontWeight: 700 }}>{subtotalFormatted}</span>
              </div>
            </div>
          </div>

          <div className="checkout-badge" style={{ marginTop: '16px' }}>
            <Icon name="local_shipping" className="checkout-badge__icon" />
            <div>
              <p className="checkout-badge__title">ANTI-TARNISH POUCH INCLUDED</p>
              <p className="checkout-badge__text">
                Every VIA order includes a care card and anti-tarnish pouch. Ships in 2–4 business days across India.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
