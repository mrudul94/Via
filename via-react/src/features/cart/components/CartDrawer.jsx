import { Link } from 'react-router-dom'
import Icon from '../../../design-system/Icon'
import { useCart } from '../context/CartContext'
import { findProduct } from '../../../data/products'
import { formatINR } from '../../../utils/format'

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    changeQty,
    removeFromCart,
    subtotal,
    checkoutOnWhatsApp,
  } = useCart()

  const freeShippingThreshold = 999
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const shippingProgressPct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' is-visible' : ''}`}
        onClick={closeCart}
      />
      <aside className={`cart-drawer${isOpen ? ' is-open' : ''}`}>
        <div className="cart-drawer__head">
          <h2>Shopping Bag</h2>
          <button className="icon-btn" onClick={closeCart} aria-label="Close cart">
            <Icon name="close" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="free-shipping-banner" style={{ padding: '12px 24px', background: 'var(--surface-container-low)', borderBottom: '1px solid var(--outline-variant)' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', marginBottom: '6px', textAlign: 'center' }}>
            {remainingForFreeShipping === 0
              ? '🎉 You unlocked FREE Express Shipping!'
              : `Add ${formatINR(remainingForFreeShipping)} more for FREE Shipping!`}
          </p>
          <div style={{ width: '100%', height: '6px', background: 'var(--surface-container-high)', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${shippingProgressPct}%`,
                height: '100%',
                background: 'var(--gold-gradient)',
                borderRadius: '999px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        <div className="cart-drawer__body custom-scrollbar">
          {cart.length === 0 && <p className="cart-empty">Your bag is empty.</p>}
          {cart.map((item) => {
            const p = findProduct(item.id)
            if (!p) return null
            return (
              <div key={item.id} className="cart-row">
                <div className="cart-row__img">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="cart-row__main">
                  <div>
                    <div className="cart-row__top">
                      <h3>{p.name}</h3>
                      <span className="cart-row__price">
                        {formatINR(p.price * item.qty)}
                      </span>
                    </div>
                    <p className="cart-row__cat">{p.category}</p>
                  </div>
                  <div className="cart-row__bottom">
                    <div className="qty-stepper">
                      <button
                        onClick={() => changeQty(p.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Icon name="remove" className="icon-sm" />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => changeQty(p.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Icon name="add" className="icon-sm" />
                      </button>
                    </div>
                    <button
                      className="cart-row__remove"
                      onClick={() => removeFromCart(p.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="cart-drawer__foot">
          <div className="cart-totals">
            <div className="cart-totals__line">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="cart-totals__line">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="cart-totals__line cart-totals__total">
              <span>Total</span>
              <span>{formatINR(subtotal)}</span>
            </div>
          </div>
          <div className="cart-drawer__actions">
            <Link to="/checkout" className="btn btn--primary" onClick={closeCart}>
              Checkout Now
            </Link>
            <button className="btn btn--outline" onClick={checkoutOnWhatsApp}>
              <Icon name="chat" className="icon-sm" />
              Order on WhatsApp
            </button>
            <button className="cart-drawer__continue" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
