import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../design-system/Icon'
import { useCMS } from '../../cms'
import { formatINR } from '../../../utils/format'

export default function SearchOverlay({ open, onClose }) {
  const { products } = useCMS()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const matches = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : []

  if (!open) return null

  return (
    <div className="search-overlay">
      <div className="search-overlay__inner">
        <div className="search-overlay__head">
          <h2>Search VIA</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close search">
            <Icon name="close" className="icon-lg" />
          </button>
        </div>
        <div className="search-field">
          <Icon name="search" className="search-field__icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS OR CATEGORIES"
          />
        </div>
        <div className="search-results custom-scrollbar">
          {!q && (
            <p className="search-results__empty">
              Start typing to search products or categories…
            </p>
          )}
          {q && matches.length === 0 && (
            <p className="search-results__empty">
              No results for &quot;{query}&quot; — try &quot;rings&quot; or
              &quot;chains&quot;.
            </p>
          )}
          {matches.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="search-result"
              onClick={onClose}
            >
              <img src={p.img} alt={p.name} />
              <div className="search-result__info">
                <p className="search-result__name">{p.name}</p>
                <p className="search-result__cat">{p.category}</p>
              </div>
              <span className="search-result__price">{formatINR(p.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
