import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useCart } from '../context/CartContext'
import { findProduct } from '../data/products'
import { formatINR } from '../utils/format'

export default function Checkout() {
  const { cart, subtotal, checkoutOnWhatsApp } = useCart()

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    checkoutOnWhatsApp(form)
  }

  return (
    <section className="section section--pad checkout">
      <h1 className="section__title section__title--center">Checkout</h1>

      <nav className="checkout-steps">
        <div className="checkout-step is-active">
          <div className="checkout-step__num">1</div>
          <span>SHIPPING</span>
        </div>
        <div className="checkout-step">
          <div className="checkout-step__num">2</div>
          <span>PAYMENT</span>
        </div>
        <div className="checkout-step">
          <div className="checkout-step__num">3</div>
          <span>REVIEW</span>
        </div>
      </nav>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleCheckout}>
          <section className="checkout-box">
            <h2>CONTACT INFORMATION</h2>
            <input
              className="line-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="EMAIL ADDRESS"
              required
            />
          </section>

          <section className="checkout-box">
            <h2>SHIPPING ADDRESS</h2>
            <div className="address-grid">
              <input
                className="line-input"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="FIRST NAME"
                required
              />
              <input
                className="line-input"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="LAST NAME"
                required
              />
              <input
                className="line-input address-grid__full"
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="ADDRESS LINE 1"
                required
              />
              <input
                className="line-input"
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="CITY"
                required
              />
              <div className="address-grid__pair">
                <input
                  className="line-input"
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="STATE"
                  required
                />
                <input
                  className="line-input"
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="PIN CODE"
                  required
                />
              </div>
              <input
                className="line-input address-grid__full"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="PHONE NUMBER"
                required
              />
            </div>
          </section>

          <div className="checkout-note">
            <Icon name="info" className="checkout-note__icon" />
            <p>
              Currently prepaid orders only, to keep pricing fair for everyone. A
              full unboxing video is required for any damage or missing-item claims
              — details in our Exchange Policy.
            </p>
          </div>

          <button type="submit" className="btn btn--primary btn--block btn--tall">
            <Icon name="chat" /> Place Order via WhatsApp
          </button>
          <p className="checkout-disclaimer">
            You&apos;ll confirm payment and delivery details with us directly on
            WhatsApp — nothing is charged automatically.
          </p>
        </form>

        <aside className="checkout-summary">
          <div className="checkout-summary__box">
            <h2>ORDER SUMMARY</h2>
            <div className="checkout-items">
              {cart.length === 0 ? (
                <p className="checkout-empty">
                  Your bag is empty — <Link to="/shop">continue shopping</Link>.
                </p>
              ) : (
                cart.map((item) => {
                  const p = findProduct(item.id)
                  if (!p) return null
                  return (
                    <div key={item.id} className="checkout-item">
                      <div className="checkout-item__img">
                        <img src={p.img} alt={p.name} />
                        <span className="checkout-item__qty">{item.qty}</span>
                      </div>
                      <div className="checkout-item__info">
                        <div>
                          <p className="checkout-item__name">
                            {p.name.toUpperCase()}
                          </p>
                          <p className="checkout-item__cat">{p.category}</p>
                        </div>
                        <p className="checkout-item__price">
                          {formatINR(p.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="checkout-totals">
              <div className="checkout-totals__line">
                <span>SUBTOTAL</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="checkout-totals__line">
                <span>SHIPPING</span>
                <span className="checkout-totals__free">FREE ABOVE ₹999</span>
              </div>
              <div className="checkout-totals__line checkout-totals__grand">
                <span>TOTAL</span>
                <span>{formatINR(subtotal)}</span>
              </div>
            </div>
          </div>

          <div className="checkout-badge">
            <Icon name="local_shipping" className="checkout-badge__icon" />
            <div>
              <p className="checkout-badge__title">CAREFUL PACKAGING</p>
              <p className="checkout-badge__text">
                Every VIA order ships with a care card and is packed to arrive
                exactly as shown.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
