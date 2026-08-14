import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { useToast } from '../context/ToastContext'
import { useCMS } from '../context/CMSContext'
import { DEFAULT_INSTA } from '../features/cms/services/cmsRepository'
import TrustBadge from '../frontend/trust-badge/TrustBadge'
import InstaShowcase from '../components/InstaShowcase'

const VIA_PILLARS = [
  {
    icon: 'workspace_premium',
    title: '✨ Premium Anti-Tarnish Finish',
    text: 'Engineered with high-grade anti-tarnish coating over premium jewellery alloy — delivering everyday-expensive luster.',
  },
  {
    icon: 'verified',
    title: '🛡️ 100% Anti-Tarnish Guarantee',
    text: 'Formulated with protective nano-coating that resists water, sweat, perfume, and daily wear — keeping your shine timeless.',
  },
  {
    icon: 'local_shipping',
    title: '🌴 Premium Quality & Fast Shipping',
    text: 'Crafted with meticulous attention to detail — packed with care, elegance, and quality inspection.',
  },
]

export default function Home() {
  const toast = useToast()
  const { products, hero, categories, reviews, settings } = useCMS()
  const taggedNew = products.filter((p) => p.tag === 'NEW' || p.isNewArrival || p.tag === 'BESTSELLER')
  const newArrivals = taggedNew.length > 0 ? taggedNew.slice(0, 4) : products.slice(0, 4)
  const categoryTiles = categories.filter((c) => Boolean(c.img && c.img.trim()))
  const instaImages = settings.instaFeed || DEFAULT_INSTA

  return (
    <>
      {/* 1. Full-Bleed Editorial Cover Hero */}
      <section className="hero">
        <div
          className="hero__bg"
          style={{
            backgroundImage: hero.bgImg ? `url('${hero.bgImg}')` : undefined,
          }}
        />
        <div className="hero__scrim" />
        <div className="hero__content">
          <span className="hero__eyebrow">
             HOUSE OF VIA • EVERYDAY LUXURY
          </span>

          <h1 className="hero__title">
            {hero.title || 'Everyday Anti-Tarnish Fine Jewellery'}
          </h1>

          <p className="hero__sub">
            {hero.sub ||
              'Everyday anti-tarnish pieces crafted for daily grace. Waterproof, sweatproof, and made to accompany your every day.'}
          </p>

          <div className="hero__actions">
            <Link to="/shop" className="btn btn--gold">
              Explore Collection &rarr;
            </Link>
            <a href="#story" className="btn btn--ghost">
              Our Heritage Story
            </a>
          </div>

          {/* Floating Trust Pills Strip */}
          <div
            className="hero__trust"
            style={{
              marginTop: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--secondary-fixed)',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 30px',
              borderRadius: 'var(--radius-full)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            }}
          >
            <span>✦ 100% Anti-Tarnish</span>
            <span className="hero__trust-sep" style={{ opacity: 0.35 }}>•</span>
            <span>✨ Waterproof &amp; Sweatproof</span>
            <span className="hero__trust-sep" style={{ opacity: 0.35 }}>•</span>
            <span>🚚 Express Shipping</span>
          </div>
        </div>
      </section>

      {/* 2. Trust Promises Strip */}
      <TrustBadge freeShippingThreshold={settings.freeShippingThreshold} />

      {/* 3. Shop by Category (Curated Collections) */}
      <section className="section section--pad">
        <div className="section__head">
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '6px' }}>
              🪷 CURATED COLLECTIONS
            </span>
            <h2 className="section__title" style={{ fontFamily: 'var(--font-heritage)' }}>
              Shop by Category
            </h2>
          </div>
          <Link to="/shop" className="link-underline">
            View All Categories &rarr;
          </Link>
        </div>
        {categoryTiles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1rem', fontWeight: 500 }}>No category tiles configured yet.</p>
            <p style={{ fontSize: '0.85rem' }}>Upload category images in the VIA Admin panel to feature collections here.</p>
          </div>
        ) : (
          <div className="category-grid">
            {categoryTiles.map((c) => (
              <Link key={c.name} to={`/shop?cat=${c.name}`} className="category-tile">
                <img src={c.img} alt={c.name} />
                <div className="category-tile__label">
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--secondary-fixed)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    CURATED EDIT
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heritage)' }}>{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 4. Handpicked New Arrivals */}
      <Reveal as="section" className="section section--pad section--alt">
        <div className="section__head">
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '6px' }}>
              ✨ HANDPICKED DAILY GRACE
            </span>
            <h2 className="section__title" style={{ fontFamily: 'var(--font-heritage)' }}>
              New Arrivals
            </h2>
          </div>
          <Link to="/shop" className="link-underline">
            View Collection &rarr;
          </Link>
        </div>
        {newArrivals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1rem', fontWeight: 500 }}>No products are available at the moment.</p>
            <p style={{ fontSize: '0.85rem' }}>Products added from the VIA Admin panel will automatically appear here.</p>
          </div>
        ) : (
          <div className="product-grid">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </Reveal>

      {/* 5. The 3 Pillars of Everyday Luxury Module */}
      <Reveal as="section" id="story" className="section section--pad">
        <div className="section__head" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '6px' }}>
              🪷 THE THREE PILLARS OF VIA
            </span>
            <h2 className="section__title" style={{ fontFamily: 'var(--font-heritage)' }}>
              Why Customers Choose VIA
            </h2>
          </div>
        </div>
        <div
          className="pillar-grid"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '28px',
          }}
        >
          {VIA_PILLARS.map((p) => (
            <div
              key={p.title}
              className="pillar-card"
              style={{
                background: '#ffffff',
                padding: '36px 30px',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--surface-container-high)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heritage)', fontSize: '20px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--on-surface-variant)' }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 7. Reviews  */}
      <Reveal as="section" className="section section--pad section--alt">
        <div className="section__head" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '6px' }}>
              🪷 VERIFIED CUSTOMER REVIEWS
            </span>
            <h2 className="section__title" style={{ fontFamily: 'var(--font-heritage)' }}>
              Loved by {settings.customerCount || '10,000+'} Customers
            </h2>
          </div>
        </div>
        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1rem', fontWeight: 500 }}>No customer reviews added yet.</p>
          </div>
        ) : (
          <div className="reviews">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-card__stars">{'★'.repeat(r.stars || 5)}</div>
                <p className="review-card__text">&quot;{r.text}&quot;</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                  <p className="review-card__author">— {r.author}</p>
                  <span style={{ fontSize: '10px', color: 'var(--secondary)', fontWeight: 700, letterSpacing: '0.1em' }}>✔ Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Reveal>

      {/* 8. Instagram Unique Showcase */}
      <Reveal>
        <InstaShowcase />
      </Reveal>
    </>
  )
}
