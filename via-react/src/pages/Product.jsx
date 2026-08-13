import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import { useCart, buyOnWhatsApp } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useCMS } from '../context/CMSContext'
import { formatINR } from '../utils/format'

import { Link } from 'react-router-dom'

export default function Product() {
  const { id } = useParams()
  const { products, findProduct } = useCMS()
  const product = findProduct(id)
  const { addToCart } = useCart()
  const toast = useToast()

  if (!product) {
    return (
      <section className="section section--pad" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heritage)', fontSize: '2rem', marginBottom: '1rem' }}>Product Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No product matches this item ID in the active CMS catalog.</p>
        <Link to="/shop" className="btn btn--primary">
          Browse Catalog &rarr;
        </Link>
      </section>
    )
  }

  const [mainImg, setMainImg] = useState(product.img)
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)

  useEffect(() => {
    setMainImg(product.img)
    setQty(1)
    setWished(false)
    document.title = `${product.name} | VIA`
  }, [product])

  const thumbs = [product.img, product.img2].filter(Boolean)
  const related = products.filter((p) => p.id !== product.id).slice(0, 4)

  const toggleWishlist = () => {
    setWished((w) => {
      const next = !w
      toast(next ? 'Saved to wishlist' : 'Removed from wishlist')
      return next
    })
  }

  return (
    <section className="section section--pad">
      <div className="product-detail">
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img src={mainImg} alt={product.name} />
          </div>
          <div className="product-gallery__thumbs">
            {thumbs.map((src, i) => (
              <button
                key={i}
                className={`product-thumb${mainImg === src ? ' is-active' : ''}`}
                style={{ backgroundImage: `url('${src}')` }}
                onClick={() => setMainImg(src)}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="product-info__cat">{product.category}</p>
          <h1 className="product-info__name">{product.name}</h1>
          <div className="product-info__rating">
            ★★★★★ <span>(early reviews)</span>
          </div>
          <div className="product-info__price">
            <span className="product-info__now">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="product-info__compare">
                {formatINR(product.compareAt)}
              </span>
            )}
          </div>
          <p className="product-info__desc">{product.desc}</p>

          <div className="product-info__buy">
            <div className="qty-stepper qty-stepper--lg">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Icon name="remove" className="icon-sm" />
              </button>
              <input type="text" value={qty} readOnly />
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Icon name="add" className="icon-sm" />
              </button>
            </div>
            <button
              className={`icon-square${wished ? ' is-active' : ''}`}
              onClick={toggleWishlist}
              aria-label="Toggle wishlist"
            >
              <Icon name="favorite" />
            </button>
          </div>

          <button
            className="btn btn--primary btn--block"
            onClick={() => addToCart(product.id, qty)}
          >
            Add to Cart
          </button>
          <button
            className="btn btn--outline btn--block"
            style={{ marginTop: '12px' }}
            onClick={() => buyOnWhatsApp(product.id)}
          >
            <Icon name="chat" className="icon-sm" /> Buy on WhatsApp
          </button>

          {/* Pincode Delivery Estimator */}
          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--surface-container-low)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--outline-variant)' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px' }}>
              Check Delivery Availability
            </p>
            <div className="pdp-pincode" style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Enter 6-digit Pincode"
                maxLength={6}
                style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--outline-variant)', borderRadius: 'var(--radius)', fontSize: '13px', background: '#fff' }}
              />
              <button
                className="btn btn--muted"
                style={{ padding: '8px 16px', fontSize: '11px' }}
                onClick={(e) => {
                  e.preventDefault()
                  toast('Estimated delivery: 2-4 business days')
                }}
              >
                CHECK
              </button>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--outline)', marginTop: '8px' }}>
              ⚡ Free Express Delivery on orders above ₹999 across India.
            </p>
          </div>

          {/* Trust Badges Strip */}
          <div className="pdp-trust" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px', textAlign: 'center' }}>
            <div style={{ padding: '12px 8px', background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius)', border: '1px solid var(--surface-container-high)' }}>
              <Icon name="verified" style={{ color: 'var(--secondary)', fontSize: '20px' }} />
              <p style={{ fontSize: '11px', fontWeight: 600, marginTop: '4px', color: 'var(--primary)' }}>Anti-Tarnish</p>
            </div>
            <div style={{ padding: '12px 8px', background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius)', border: '1px solid var(--surface-container-high)' }}>
              <Icon name="water_drop" style={{ color: 'var(--secondary)', fontSize: '20px' }} />
              <p style={{ fontSize: '11px', fontWeight: 600, marginTop: '4px', color: 'var(--primary)' }}>Waterproof</p>
            </div>
            <div style={{ padding: '12px 8px', background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius)', border: '1px solid var(--surface-container-high)' }}>
              <Icon name="local_shipping" style={{ color: 'var(--secondary)', fontSize: '20px' }} />
              <p style={{ fontSize: '11px', fontWeight: 600, marginTop: '4px', color: 'var(--primary)' }}>Fast Shipping</p>
            </div>
          </div>

          <div className="product-accordions">
            <details open>
              <summary>
                <span>Material &amp; Care</span>
                <Icon name="expand_more" />
              </summary>
              <p>
                <strong>Material:</strong> {product.material}
              </p>
              <p>
                <strong>Care:</strong> {product.care}
              </p>
            </details>
            <details>
              <summary>
                <span>Shipping &amp; Exchange</span>
                <Icon name="expand_more" />
              </summary>
              <p>
                Ships in 2–4 business days. Prepaid orders only for
                now. A full unboxing video is required for any damage or
                missing-item exchange — this helps us take care of you quickly and
                fairly.
              </p>
            </details>
          </div>
        </div>
      </div>

      <section className="product-related">
        <h2 className="section__title">You May Also Like</h2>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </section>
  )
}
