import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCMS } from '../context/CMSContext'

export default function Shop() {
  const { products, categories } = useCMS()
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')

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
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price)
    return list
  }, [category, sort, products])

  return (
    <section className="section section--pad shop">
      <div className="shop__head">
        <h1 className="section__title section__title--center">Shop All</h1>
        <p className="shop__count">
          <span>{items.length}</span> pieces — anti-tarnish, made for everyday wear
        </p>
      </div>

      <div className="shop__controls">
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
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: 500 }}>No products are available at the moment.</p>
          <p style={{ fontSize: '0.9rem' }}>Add new products from the VIA Admin dashboard.</p>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
