import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../design-system/Icon'
import { useCart } from '../../cart'
import { useToast } from '../../../context/ToastContext'
import { formatINR } from '../../../utils/format'

export default function ProductCard({ product: p, forceTag }) {
  const { addToCart } = useCart()
  const toast = useToast()
  const [wished, setWished] = useState(false)

  const toggleWishlist = (e) => {
    e.preventDefault()
    setWished((w) => {
      const next = !w
      toast(next ? 'Saved to wishlist' : 'Removed from wishlist')
      return next
    })
  }

  const discountPct = p.compareAt && p.compareAt > p.price
    ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100)
    : 0

  const activeTag = forceTag || p.tag

  return (
    <div className="product-card">
      <Link to={`/product/${p.id}`} className="product-card__media">
        {activeTag ? (
          <span className="product-card__tag">{activeTag}</span>
        ) : discountPct > 0 ? (
          <span className="product-card__discount">-{discountPct}% OFF</span>
        ) : null}
        <img
          src={p.img}
          className={`product-card__img${p.img2 ? ' product-card__img--primary' : ''}`}
          alt={p.name}
          loading="lazy"
          decoding="async"
        />
        {p.img2 && (
          <img
            src={p.img2}
            className="product-card__img product-card__img--hover"
            alt={`${p.name} view 2`}
            loading="lazy"
            decoding="async"
          />
        )}
        <button
          className={`product-card__wish${wished ? ' is-active' : ''}`}
          onClick={toggleWishlist}
          aria-label="Toggle wishlist"
        >
          <Icon name="favorite" className="icon-lg" />
        </button>
      </Link>
      <Link to={`/product/${p.id}`} className="product-card__info">
        <p className="product-card__cat">{p.category}</p>
        <h4 className="product-card__name" style={{ fontFamily: 'var(--font-heritage)' }}>{p.name}</h4>
        <p className="product-card__price">
          {p.compareAt && (
            <span className="product-card__compare">{formatINR(p.compareAt)}</span>
          )}
          <span className="product-card__now">{formatINR(p.price)}</span>
        </p>
      </Link>
      <button className="product-card__add" onClick={() => addToCart(p.id)}>
        + Add to Bag
      </button>
    </div>
  )
}
