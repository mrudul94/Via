import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'
import { useCMS } from '../context/CMSContext'

export default function NewArrivals() {
  const { products, categories } = useCMS()
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')

  const categoryOptions = useMemo(() => ['All', ...categories.map((c) => c.name)], [categories])

  // Sync category from ?cat= query param
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat && categoryOptions.includes(cat)) setCategory(cat)
    else setCategory('All')
  }, [searchParams, categoryOptions])

  const items = useMemo(() => {
    let list =
      category === 'All'
        ? [...products]
        : products.filter((p) => p.category === category)

    // Sort priority: Newest items / ID descending first, then custom sorts
    if (sort === 'newest') {
      list.sort((a, b) => (b.id || 0) - (a.id || 0))
    } else if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    }

    return list
  }, [category, sort, products])

  return (
    <div className="new-arrivals-page">
      {/* Hero Banner Header */}
      <section 
        className="new-arrivals-hero"
        style={{
          background: 'linear-gradient(180deg, var(--primary) 0%, #1a1511 100%)',
          color: '#ffffff',
          padding: '72px 24px 60px',
          textAlign: 'center',
          position: 'relative',
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
            ✦ JUST DROPPED • THE LATEST EDIT
          </span>
          <h1 
            style={{ 
              fontFamily: 'var(--font-heritage)', 
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
              fontWeight: 600,
              letterSpacing: '0.04em',
              marginBottom: '16px',
              color: '#ffffff'
            }}
          >
            New Arrivals
          </h1>
          <p style={{ 
            fontSize: '15px', 
            lineHeight: 1.6, 
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '34rem',
            margin: '0 auto 24px'
          }}>
            Discover our newest handcrafted anti-tarnish fine jewellery pieces. Designed for everyday luxury, water resistance, and effortless layering.
          </p>
          <div className="page-hero__badges" style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '16px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary-fixed)' }}>
            <span>✦ 100% Anti-Tarnish</span>
            <span className="page-hero__sep">•</span>
            <span>✦ Water-Safe</span>
            <span className="page-hero__sep">•</span>
            <span>✦ 18K Gold Plated</span>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="section section--pad shop">
        <div className="shop__controls" style={{ marginTop: '12px' }}>
          <div className="filter-chips">
            {categoryOptions.map((c) => (
              <button
                key={c}
                className={`filter-chip${category === c ? ' is-active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--on-surface-variant)', gridColumn: '1 / -1' }}>
            <Icon name="auto_awesome" style={{ fontSize: '40px', color: 'var(--secondary)', marginBottom: '16px' }} />
            <p style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-heritage)' }}>
              No New Arrivals in this category yet.
            </p>
            <p style={{ fontSize: '0.95rem', marginBottom: '24px' }}>
              Check back soon for new drops or explore all collections in our shop.
            </p>
            <Link to="/shop" className="btn btn--primary">
              Explore All Collections
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} forceTag="NEW" />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
