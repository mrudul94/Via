import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { VIA_PRODUCTS } from '../data/products'
import { adminCmsService } from '../services/adminCmsService'
import { isSupabaseConfigured } from '../lib/supabaseClient'

const CMSContext = createContext(null)
const STORAGE_KEY = 'via_cms_data_v1'

const DEFAULT_HERO = {
  eyebrow: '✨ LUXURY EVERYDAY JEWELLERY',
  title: "Jewellery That Doesn't Quit On You",
  sub: 'Anti-tarnish • Water-safe • Sweatproof. Designed to be worn every single day — to work, to bed, in the shower.',
  bgImg: '',
}

const DEFAULT_CATEGORIES = []

const DEFAULT_MARQUEE = [
  'FREE PAN-INDIA EXPRESS SHIPPING ON ORDERS ABOVE ₹999',
  'EVERYDAY LUXURY ANTI-TARNISH JEWELLERY',
  'BUY DIRECTLY ON WHATSAPP FOR INSTANT CONFIRMATION',
]

const DEFAULT_REVIEWS = []

const DEFAULT_SETTINGS = {
  whatsappNumber: '918075915386',
  freeShippingThreshold: 999,
  storeNotice: '⚡ All orders ship with an anti-tarnish pouch and care card.',
  customerCount: '10,000+',
}

function loadInitialFallbackData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        products: parsed.products || VIA_PRODUCTS,
        hero: parsed.hero || DEFAULT_HERO,
        categories: parsed.categories || DEFAULT_CATEGORIES,
        marquee: parsed.marquee || DEFAULT_MARQUEE,
        reviews: parsed.reviews || DEFAULT_REVIEWS,
        settings: parsed.settings || DEFAULT_SETTINGS,
      }
    }
  } catch (e) {}
  return {
    products: VIA_PRODUCTS,
    hero: DEFAULT_HERO,
    categories: DEFAULT_CATEGORIES,
    marquee: DEFAULT_MARQUEE,
    reviews: DEFAULT_REVIEWS,
    settings: DEFAULT_SETTINGS,
  }
}

export function CMSProvider({ children }) {
  const [data, setData] = useState(loadInitialFallbackData)
  const [notification, setNotification] = useState('')
  const [hasLegacyData, setHasLegacyData] = useState(false)
  const [isMigrating, setIsMigrating] = useState(false)
  const [isDbConnected, setIsDbConnected] = useState(false)

  const notify = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 4000)
  }

  // Check for legacy localStorage data needing migration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setHasLegacyData(true)
      }
    } catch (e) {}
  }, [])

  // Fetch live store data from Supabase
  const loadCloudData = useCallback(async () => {
    if (!isSupabaseConfigured()) return
    try {
      const cloudData = await adminCmsService.fetchStoreData()
      if (cloudData) {
        setData(cloudData)
        setIsDbConnected(true)
      }
    } catch (err) {
      console.warn('Could not fetch cloud data, using local fallback:', err)
    }
  }, [])

  useEffect(() => {
    loadCloudData()
  }, [loadCloudData])

  const openStorefront = useCallback(() => {
    const storefrontUrl = import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:5173'
    try {
      window.open(storefrontUrl, '_blank', 'noopener,noreferrer')
    } catch (e) {}
  }, [])

  const syncStorefront = useCallback(async () => {
    if (isSupabaseConfigured()) {
      await loadCloudData()
    }
    notify('⚡ Database data refreshed!')
  }, [loadCloudData])

  // Helper to persist state to localStorage as fallback cache
  const persistLocal = (newData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    } catch (e) {}
  }

  // --- Product CRUD ---
  const addProduct = useCallback(async (newProd) => {
    let createdProduct = null

    if (isSupabaseConfigured()) {
      try {
        createdProduct = await adminCmsService.createProduct(newProd, data.categories)
      } catch (err) {
        console.error('Database create error:', err)
        alert('Supabase Database Error: ' + err.message + '\n\nPlease ensure you have run the latest SQL migration in Supabase SQL Editor.')
        return
      }
    }

    const prodToAdd = createdProduct || { ...newProd, id: 'p_' + Date.now() }
    setData((prev) => {
      const nextData = { ...prev, products: [prodToAdd, ...prev.products] }
      persistLocal(nextData)
      return nextData
    })

    if (isSupabaseConfigured()) {
      await loadCloudData()
    }
    notify('Product created successfully in database!')
  }, [data.categories, loadCloudData])

  const updateProduct = useCallback(async (id, updatedFields) => {
    if (isSupabaseConfigured()) {
      try {
        await adminCmsService.updateProduct(id, updatedFields, data.categories)
      } catch (err) {
        console.error('Database update error:', err)
        alert('Supabase Database Error: ' + err.message)
        return
      }
    }

    setData((prev) => {
      const nextData = {
        ...prev,
        products: prev.products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
      }
      persistLocal(nextData)
      return nextData
    })

    if (isSupabaseConfigured()) {
      await loadCloudData()
    }
    notify('Product updated in database!')
  }, [data.categories, loadCloudData])

  const deleteProduct = useCallback(async (id) => {
    if (isSupabaseConfigured()) {
      try {
        await adminCmsService.deleteProduct(id)
      } catch (err) {
        console.error('Database delete error:', err)
        alert('Supabase Database Error: ' + err.message)
        return
      }
    }

    setData((prev) => {
      const nextData = {
        ...prev,
        products: prev.products.filter((p) => p.id !== id),
      }
      persistLocal(nextData)
      return nextData
    })

    if (isSupabaseConfigured()) {
      await loadCloudData()
    }
    notify('Product deleted from database.')
  }, [loadCloudData])

  // --- Hero Section ---
  const updateHero = useCallback(async (heroData) => {
    if (isSupabaseConfigured()) {
      try {
        await adminCmsService.updateHero(heroData)
        await loadCloudData()
        notify('Homepage Hero updated in database!')
        return
      } catch (err) {
        notify('Error saving Hero: ' + err.message)
        return
      }
    }
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...heroData } }))
    notify('Homepage Hero updated!')
  }, [loadCloudData])

  // --- Categories ---
  const updateCategories = useCallback(async (categoriesList) => {
    if (isSupabaseConfigured()) {
      try {
        await adminCmsService.saveCategories(categoriesList)
        await loadCloudData()
        notify('Categories saved in database!')
        return
      } catch (err) {
        notify('Error saving categories: ' + err.message)
        return
      }
    }
    setData((prev) => ({ ...prev, categories: categoriesList }))
    notify('Categories saved!')
  }, [loadCloudData])

  // --- Marquee ---
  const updateMarquee = useCallback(async (marqueeList) => {
    if (isSupabaseConfigured()) {
      try {
        await adminCmsService.saveMarquee(marqueeList)
        await loadCloudData()
        notify('Announcement ticker updated in database!')
        return
      } catch (err) {
        notify('Error saving marquee: ' + err.message)
        return
      }
    }
    setData((prev) => ({ ...prev, marquee: marqueeList }))
    notify('Announcement ticker updated!')
  }, [loadCloudData])

  // --- Reviews ---
  const updateReviews = useCallback(async (reviewsList) => {
    if (isSupabaseConfigured()) {
      try {
        await adminCmsService.saveReviews(reviewsList)
        await loadCloudData()
        notify('Reviews updated in database!')
        return
      } catch (err) {
        notify('Error saving reviews: ' + err.message)
        return
      }
    }
    setData((prev) => ({ ...prev, reviews: reviewsList }))
    notify('Customer reviews updated!')
  }, [loadCloudData])

  // --- Settings ---
  const updateSettings = useCallback(async (settingsData) => {
    if (isSupabaseConfigured()) {
      try {
        await adminCmsService.updateSettings(settingsData)
        await loadCloudData()
        notify('Store settings saved in database!')
        return
      } catch (err) {
        notify('Error saving settings: ' + err.message)
        return
      }
    }
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...settingsData } }))
    notify('Store configuration saved!')
  }, [loadCloudData])

  // --- Migrate Legacy LocalStorage Data to Supabase ---
  const migrateLegacyData = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      notify('Supabase is not configured yet.')
      return
    }
    setIsMigrating(true)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const count = await adminCmsService.migrateLegacyDataToSupabase(parsed)
        await loadCloudData()
        setHasLegacyData(false)
        notify(`Successfully migrated legacy data (${count} products) to Supabase Cloud Database!`)
      }
    } catch (err) {
      console.error('Migration error:', err)
      notify('Migration failed: ' + err.message)
    } finally {
      setIsMigrating(false)
    }
  }, [loadCloudData])

  // --- JSON Export ---
  const exportStoreJSON = useCallback(() => {
    const jsonStr = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'via_store_data.json'
    a.click()
    URL.revokeObjectURL(url)
    notify('Store data JSON exported!')
  }, [data])

  // --- JSON Import ---
  const importStoreJSON = useCallback(async (jsonObj) => {
    try {
      if (jsonObj.products && jsonObj.hero) {
        if (isSupabaseConfigured()) {
          await adminCmsService.migrateLegacyDataToSupabase(jsonObj)
          await loadCloudData()
        } else {
          setData(jsonObj)
        }
        notify('Store data imported successfully!')
      } else {
        alert('Invalid JSON store format.')
      }
    } catch (e) {
      alert('Error parsing JSON file.')
    }
  }, [loadCloudData])

  const value = {
    products: data.products,
    hero: data.hero,
    categories: data.categories,
    marquee: data.marquee,
    reviews: data.reviews,
    settings: data.settings,
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
    openStorefront,
  }

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>
}

export const useCMS = () => useContext(CMSContext)

