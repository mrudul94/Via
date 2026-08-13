import { useState, useEffect } from 'react'
import Icon from '../components/Icon'
import { useCMS } from '../context/CMSContext'
import { formatINR } from '../data/products'
import { storageService } from '../services/storageService'
import { isSupabaseConfigured } from '../lib/supabaseClient'

export default function AdminDashboard({ adminSession, onLogout }) {
  const {
    products,
    hero,
    categories,
    marquee,
    reviews,
    settings,
    notification,
    hasLegacyData,
    isMigrating,
    isDbConnected,
    addProduct,
    updateProduct,
    deleteProduct,
    updateHero,
    updateCategories,
    updateMarquee,
    updateReviews,
    updateSettings,
    migrateLegacyData,
    exportStoreJSON,
    importStoreJSON,
    syncStorefront,
  } = useCMS()


  const [activeTab, setActiveTab] = useState('products')
  const [search, setSearch] = useState('')

  // Product Modal State
  const [showProdModal, setShowProdModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Form States
  const [prodForm, setProdForm] = useState({
    name: '',
    category: '',
    price: '',
    compareAt: '',
    tag: '',
    img: '',
    img2: '',
    desc: '',
    material: '',
    care: '',
  })

  // Hero Form
  const [heroForm, setHeroForm] = useState(hero)
  const [settingsForm, setSettingsForm] = useState(settings)
  const [catList, setCatList] = useState(categories)
  const [marqueeText, setMarqueeText] = useState((marquee || []).join('\n'))

  // Sync local form states when CMSContext data loads from Supabase
  useEffect(() => {
    setSettingsForm(settings)
    setHeroForm(hero)
    setCatList(categories)
    setMarqueeText((marquee || []).join('\n'))
  }, [settings, hero, categories, marquee])

  // Review Form
  const [reviewForm, setReviewForm] = useState({ author: '', stars: 5, text: '' })

  const [isUploadingFile, setIsUploadingFile] = useState(false)

  const handleFileUpload = async (e, callback, folder = 'products') => {
    const file = e.target.files[0]
    if (!file) return

    if (isSupabaseConfigured()) {
      try {
        setIsUploadingFile(true)
        const storagePath = await storageService.uploadFile(file, folder)
        const publicUrl = storageService.getPublicUrl(storagePath)
        callback(publicUrl)
      } catch (err) {
        alert('Cloud image upload error: ' + err.message)
      } finally {
        setIsUploadingFile(false)
      }
    } else {
      const reader = new FileReader()
      reader.onload = (event) => {
        callback(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleJSONFileImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        importStoreJSON(parsed)
      } catch (err) {
        alert('Invalid JSON file format.')
      }
    }
    reader.readAsText(file)
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  const openAddModal = () => {
    setEditingProduct(null)
    const defaultCat = categories[0]?.name || catList[0]?.name || ''
    setProdForm({
      name: '',
      category: defaultCat,
      price: '',
      compareAt: '',
      tag: '',
      img: '',
      img2: '',
      desc: '',
      material: '',
      care: '',
    })
    setShowProdModal(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setProdForm({
      name: product.name || '',
      category: product.category || '',
      price: product.price || 0,
      compareAt: product.compareAt || '',
      tag: product.tag || '',
      img: product.img || '',
      img2: product.img2 || '',
      desc: product.desc || '',
      material: product.material || '',
      care: product.care || '',
    })
    setShowProdModal(true)
  }

  const handleSaveProduct = (e) => {
    e.preventDefault()
    const payload = {
      ...prodForm,
      price: Number(prodForm.price),
      compareAt: prodForm.compareAt ? Number(prodForm.compareAt) : null,
    }
    if (editingProduct) {
      updateProduct(editingProduct.id, payload)
    } else {
      addProduct(payload)
    }
    setShowProdModal(false)
  }

  const handleSaveHero = (e) => {
    e.preventDefault()
    updateHero(heroForm)
  }

  const handleSaveSettings = (e) => {
    e.preventDefault()
    updateSettings({
      ...settingsForm,
      freeShippingThreshold: Number(settingsForm.freeShippingThreshold),
    })
  }

  const handleAddCategory = () => {
    const newCat = {
      id: 'cat_' + Date.now(),
      name: 'New Category',
      slug: 'new-category',
      img: '',
    }
    setCatList((prev) => [...prev, newCat])
  }

  const handleRemoveCategory = (index) => {
    setCatList((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleSaveCategories = (e) => {
    e.preventDefault()
    updateCategories(catList)
  }

  const handleSaveMarquee = (e) => {
    e.preventDefault()
    const list = marqueeText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    updateMarquee(list)
  }

  const handleAddReview = (e) => {
    e.preventDefault()
    if (!reviewForm.author || !reviewForm.text) return
    updateReviews([reviewForm, ...reviews])
    setReviewForm({ author: '', stars: 5, text: '' })
  }

  return (
    <div>
      <header className="admin-nav-bar">
        <div className="admin-nav-bar__logo">
          VIA CMS
          <span className="admin-nav-bar__tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', textTransform: 'none', border: '1px solid rgba(255,255,255,0.2)', fontSize: '11px', fontWeight: 500 }}>
            👤 {adminSession?.user?.email || 'admin@houseofvia.com'}
          </span>
        </div>
        <div className="admin-nav-bar__actions">
          <button className="btn btn--gold" style={{ background: 'var(--gold-gradient)', color: '#fff' }} onClick={syncStorefront} title="Broadcast real-time refresh to storefront">
            <Icon name="sync" /> Refresh Main Website
          </button>
          <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }} title="Open live storefront in new tab">
            <Icon name="open_in_new" /> View Storefront
          </a>
          {onLogout && (
            <button className="btn btn--outline" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)' }} onClick={onLogout}>
              Sign Out
            </button>
          )}
        </div>
      </header>

      <div className="admin-page">
        <header className="admin-header">
          <div className="admin-header__title">
            <h1>VIA Store Admin Control Panel</h1>
            <p>Production Cloud Content Management System &bull; Supabase PostgreSQL Backed</p>
          </div>
        </header>

        {hasLegacyData && isSupabaseConfigured() && (
          <div className="admin-legacy-banner" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fbbf24', padding: '14px 18px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>📦 Legacy Local CMS Data Detected</strong>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#fef08a' }}>
                You have CMS content stored locally in browser localStorage. Would you like to migrate this data to your Supabase Cloud Database?
              </p>
            </div>
            <button className="btn btn--primary" onClick={migrateLegacyData} disabled={isMigrating}>
              {isMigrating ? 'Migrating Data...' : 'Migrate to Supabase Cloud'}
            </button>
          </div>
        )}

        {notification && <div className="notification-toast">⚡ {notification}</div>}

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab${activeTab === 'products' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Products ({products.length})
          </button>
          <button
            className={`admin-tab${activeTab === 'categories' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            🏷️ Categories ({categories.length})
          </button>
          <button
            className={`admin-tab${activeTab === 'hero' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            🖼️ Hero Banner
          </button>
          <button
            className={`admin-tab${activeTab === 'marquee' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('marquee')}
          >
            📢 Announcements ({marquee.length})
          </button>
          <button
            className={`admin-tab${activeTab === 'reviews' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            ⭐ Reviews ({reviews.length})
          </button>
          <button
            className={`admin-tab${activeTab === 'settings' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Store Settings
          </button>
        </div>

        {/* --- PRODUCTS TAB --- */}
        {activeTab === 'products' && (
          <div className="admin-card">
            <div className="admin-card__title">
              <span>Product Catalog</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button className="btn btn--muted" onClick={syncStorefront} title="Sync changes to live storefront">
                  <Icon name="sync" /> Sync Live Storefront
                </button>
                <button className="btn btn--primary" onClick={openAddModal}>
                  <Icon name="add" /> Add New Product
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                className="admin-input"
                placeholder="Search products by title or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Compare At</th>
                    <th>Badge</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <img src={p.img} alt={p.name} className="admin-thumb" />
                      </td>
                      <td>
                        <strong>{p.name}</strong>
                      </td>
                      <td>
                        <span className="admin-badge admin-badge--tag">{p.category}</span>
                      </td>
                      <td>
                        <strong>{formatINR(p.price)}</strong>
                      </td>
                      <td>{p.compareAt ? formatINR(p.compareAt) : '—'}</td>
                      <td>
                        {p.tag ? <span className="admin-badge admin-badge--gold">{p.tag}</span> : '—'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="btn btn--muted"
                            style={{ padding: '6px 12px', fontSize: '11px' }}
                            onClick={() => openEditModal(p)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn--outline"
                            style={{ padding: '6px 12px', fontSize: '11px', color: 'var(--error)', borderColor: 'var(--error)' }}
                            onClick={() => deleteProduct(p.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- CATEGORIES TAB --- */}
        {activeTab === 'categories' && (
          <div className="admin-card">
            <div className="admin-card__title">
              <span>Category Tiles ({catList.length})</span>
              <button type="button" className="btn btn--primary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={handleAddCategory}>
                + Add New Category
              </button>
            </div>
            <form onSubmit={handleSaveCategories}>
              <div className="admin-grid-2">
                {catList.map((cat, idx) => (
                  <div key={idx} style={{ padding: '16px', background: 'var(--surface-low)', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', margin: 0, color: 'var(--secondary)' }}>Category #{idx + 1}</h3>
                      <button
                        type="button"
                        className="btn btn--outline"
                        style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--error)', borderColor: 'var(--error)' }}
                        onClick={() => handleRemoveCategory(idx)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="admin-form-group">
                      <label>Category Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={cat.name}
                        onChange={(e) => {
                          const updated = [...catList]
                          updated[idx].name = e.target.value
                          updated[idx].slug = e.target.value.toLowerCase().replace(/\s+/g, '-')
                          setCatList(updated)
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Cover Image</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="Image URL or upload below..."
                          value={cat.img}
                          onChange={(e) => {
                            const updated = [...catList]
                            updated[idx].img = e.target.value
                            setCatList(updated)
                          }}
                        />
                        {cat.img && <img src={cat.img} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                      </div>
                      <div style={{ marginTop: '6px' }}>
                        <label style={{ fontSize: '11px', color: 'var(--secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          📁 Upload from Device Memory
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) =>
                              handleFileUpload(e, (dataUrl) => {
                                const updated = [...catList]
                                updated[idx].img = dataUrl
                                setCatList(updated)
                              }, 'categories')
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="submit" className="btn btn--primary" style={{ marginTop: '24px' }}>
                Save Categories
              </button>
            </form>
          </div>
        )}

        {/* --- HERO TAB --- */}
        {activeTab === 'hero' && (
          <div className="admin-card">
            <div className="admin-card__title">
              <span>Homepage Hero Banner</span>
            </div>
            <form onSubmit={handleSaveHero}>
              <div className="admin-form-group">
                <label>Eyebrow Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={heroForm.eyebrow}
                  onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Main Headline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Subheadline</label>
                <textarea
                  className="admin-input"
                  rows={3}
                  value={heroForm.sub}
                  onChange={(e) => setHeroForm({ ...heroForm, sub: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Background Image</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Image URL or upload from device below..."
                    value={heroForm.bgImg}
                    onChange={(e) => setHeroForm({ ...heroForm, bgImg: e.target.value })}
                  />
                  {heroForm.bgImg && <img src={heroForm.bgImg} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <label className="btn btn--muted" style={{ padding: '8px 16px', fontSize: '11px', cursor: 'pointer' }}>
                    📁 Upload Hero Image from Device
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) => {
                          setHeroForm({ ...heroForm, bgImg: dataUrl })
                        })
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="admin-form-group">
                <label>Hero Image Display Style</label>
                <select
                  className="admin-input"
                  value={heroForm.bgFit || 'ambient'}
                  onChange={(e) => setHeroForm({ ...heroForm, bgFit: e.target.value })}
                >
                  <option value="ambient">✨ Smart Ambient Fit (Recommended - Uncropped, high-res photo with glowing ambient backdrop)</option>
                  <option value="cover">🖼️ Full Bleed Cover (Stretches photo across the full background)</option>
                </select>
              </div>
              <button type="submit" className="btn btn--primary">
                Save Hero Banner
              </button>
            </form>
          </div>
        )}

        {/* --- MARQUEE TAB --- */}
        {activeTab === 'marquee' && (
          <div className="admin-card">
            <div className="admin-card__title">
              <span>Announcement Ticker Messages</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--outline)', marginBottom: '16px' }}>
              Enter each announcement ticker message on a new line below.
            </p>
            <form onSubmit={handleSaveMarquee}>
              <div className="admin-form-group">
                <textarea
                  className="admin-input"
                  rows={5}
                  value={marqueeText}
                  onChange={(e) => setMarqueeText(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn--primary">
                Save Announcements
              </button>
            </form>
          </div>
        )}

        {/* --- REVIEWS TAB --- */}
        {activeTab === 'reviews' && (
          <div className="admin-card">
            <div className="admin-card__title">
              <span>Customer Reviews</span>
            </div>

            <form onSubmit={handleAddReview} style={{ marginBottom: '32px', padding: '16px', background: 'var(--surface-low)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Add Customer Testimonial</h3>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Priya M."
                    value={reviewForm.author}
                    onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Star Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    className="admin-input"
                    value={reviewForm.stars}
                    onChange={(e) => setReviewForm({ ...reviewForm, stars: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Review Content</label>
                <textarea
                  className="admin-input"
                  rows={2}
                  placeholder="Customer review text..."
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn--primary">
                + Add Review
              </button>
            </form>

            <div style={{ display: 'grid', gap: '16px' }}>
              {reviews.map((r, i) => (
                <div key={i} className="admin-review-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--outline-variant)', borderRadius: 'var(--radius)' }}>
                  <div>
                    <p style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>{'★'.repeat(r.stars)}</p>
                    <p style={{ fontSize: '14px', marginTop: '4px' }}>&quot;{r.text}&quot;</p>
                    <p style={{ fontSize: '12px', color: 'var(--outline)', marginTop: '4px' }}>— {r.author}</p>
                  </div>
                  <button
                    className="btn btn--outline"
                    style={{ padding: '6px 12px', fontSize: '11px', color: 'var(--error)', borderColor: 'var(--error)' }}
                    onClick={() => updateReviews(reviews.filter((_, idx) => idx !== i))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <div className="admin-card">
            <div className="admin-card__title">
              <span>Store Configuration</span>
            </div>
            <form onSubmit={handleSaveSettings}>
              <div className="admin-form-group">
                <label>WhatsApp Business Number (Country code without +)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Free Shipping Threshold Amount (₹)</label>
                <input
                  type="number"
                  className="admin-input"
                  value={settingsForm.freeShippingThreshold}
                  onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Store Notice Banner</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settingsForm.storeNotice || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeNotice: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Happy Customers Count Badge (e.g. 10,000+)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. 10,000+ or 25,000+ Happy Customers"
                  value={settingsForm.customerCount || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, customerCount: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn--primary">
                Save Configuration
              </button>
            </form>
          </div>
        )}

        {/* Add / Edit Product Modal */}
        {showProdModal && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <div className="admin-modal__head">
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button className="btn btn--outline" style={{ padding: '6px 12px' }} onClick={() => setShowProdModal(false)}>
                  ✕
                </button>
              </div>
              <form onSubmit={handleSaveProduct}>
                <div className="admin-form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Category</label>
                    {(() => {
                      const availCats = Array.from(
                        new Set([
                          ...categories.map((c) => c.name),
                          ...catList.map((c) => c.name),
                          prodForm.category,
                        ].filter(Boolean))
                      )
                      if (availCats.length === 0) {
                        return (
                          <div>
                            <select className="admin-input" value="" disabled>
                              <option value="">No categories created yet</option>
                            </select>
                            <p style={{ fontSize: '11px', color: '#c92a2a', marginTop: '4px' }}>
                              ⚠️ Add categories in the <strong>CATEGORIES</strong> tab first.
                            </p>
                          </div>
                        )
                      }
                      return (
                        <select
                          className="admin-input"
                          value={prodForm.category}
                          onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                        >
                          {availCats.map((catName) => (
                            <option key={catName} value={catName}>
                              {catName}
                            </option>
                          ))}
                        </select>
                      )
                    })()}
                  </div>
                  <div className="admin-form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      className="admin-input"
                      required
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Compare At Price (₹)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="Optional original price"
                      value={prodForm.compareAt}
                      onChange={(e) => setProdForm({ ...prodForm, compareAt: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Badge Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. NEW, BESTSELLER, COMBO"
                      value={prodForm.tag}
                      onChange={(e) => setProdForm({ ...prodForm, tag: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Main Product Image</label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Image URL or upload from device below..."
                      required
                      value={prodForm.img}
                      onChange={(e) => setProdForm({ ...prodForm, img: e.target.value })}
                    />
                    {prodForm.img && <img src={prodForm.img} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--outline-variant)' }} />}
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <label className="btn btn--muted" style={{ padding: '8px 16px', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      📁 Choose Product Image from Device Memory
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) => {
                            setProdForm({ ...prodForm, img: dataUrl })
                          })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    className="admin-input"
                    rows={2}
                    value={prodForm.desc}
                    onChange={(e) => setProdForm({ ...prodForm, desc: e.target.value })}
                  />
                </div>

                <div className="admin-modal__foot">
                  <button
                    type="button"
                    className="btn btn--muted"
                    onClick={() => setShowProdModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--primary">
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
