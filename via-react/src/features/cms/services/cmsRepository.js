import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'
import { storageService } from '../../../services/storageService'

export const DEFAULT_PRODUCTS = []

export const DEFAULT_HERO = {
  eyebrow: '✨ LUXURY EVERYDAY JEWELLERY',
  title: "Jewellery That Doesn't Quit On You",
  sub: 'Anti-tarnish • Water-safe • Sweatproof. Designed to be worn every single day — to work, to bed, in the shower.',
  bgImg: '',
  bgFit: 'ambient',
}

export const DEFAULT_CATEGORIES = []

export const DEFAULT_MARQUEE = [
  'FREE PAN-INDIA EXPRESS SHIPPING ON ORDERS ABOVE ₹999',
  'EVERYDAY LUXURY ANTI-TARNISH JEWELLERY',
  'BUY DIRECTLY ON WHATSAPP FOR INSTANT CONFIRMATION',
]

export const DEFAULT_REVIEWS = []

export const DEFAULT_INSTA = []

export const DEFAULT_SETTINGS = {
  whatsappNumber: '918075915386',
  freeShippingThreshold: 999,
  storeNotice: '⚡ All orders ship with an anti-tarnish pouch and care card.',
  customerCount: '10,000+',
}

const LOCAL_STORAGE_KEY = 'via_cms_data_v1'

export const cmsRepository = {
  /**
   * Synchronously load data from localStorage or default fallbacks.
   * Useful for immediate initial rendering before async database fetch resolves.
   */
  loadData: () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          products: parsed.products || DEFAULT_PRODUCTS,
          hero: parsed.hero || DEFAULT_HERO,
          categories: parsed.categories || DEFAULT_CATEGORIES,
          marquee: parsed.marquee || DEFAULT_MARQUEE,
          reviews: parsed.reviews || DEFAULT_REVIEWS,
          settings: parsed.settings || DEFAULT_SETTINGS,
        }
      }
    } catch (e) {
      console.warn('Could not parse localStorage cache:', e)
    }
    return {
      products: DEFAULT_PRODUCTS,
      hero: DEFAULT_HERO,
      categories: DEFAULT_CATEGORIES,
      marquee: DEFAULT_MARQUEE,
      reviews: DEFAULT_REVIEWS,
      settings: DEFAULT_SETTINGS,
    }
  },

  /**
   * Async fetch from Supabase PostgreSQL database.
   * Resolves storage object paths into public CDN URLs and maps database columns
   * into the exact data contract expected by the storefront.
   */
  fetchFromSupabase: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      return cmsRepository.loadData()
    }

    try {
      // 1. Fetch Categories
      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true })

      const categories = (catData || []).map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug || c.name.toLowerCase().replace(/\s+/g, '-'),
        img: storageService.getPublicUrl(c.img),
      }))

      // Create Category lookup map by ID and by Name
      const catMapById = new Map(categories.map((c) => [c.id, c.name]))

      // 2. Fetch Products
      const { data: prodData, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true })

      if (prodErr) throw prodErr

      const products = (prodData || []).map((p) => {
        // Resolve category name from FK category_id if available, fallback to category_name
        const resolvedCategory = p.category_id ? (catMapById.get(p.category_id) || p.category_name) : p.category_name
        return {
          id: p.id, // Preserves text ID or generated UUID
          name: p.name,
          category: resolvedCategory || 'Necklaces',
          categoryId: p.category_id,
          price: Number(p.price || 0),
          compareAt: p.compare_at ? Number(p.compare_at) : null,
          tag: p.tag || '',
          img: storageService.getPublicUrl(p.img),
          img2: storageService.getPublicUrl(p.img2),
          desc: p.description || '',
          material: p.material || '18K Gold Plated Stainless Steel',
          care: p.care || 'Anti-tarnish, water-safe, sweatproof',
        }
      })

      // 3. Fetch Hero Banner
      const { data: heroData } = await supabase
        .from('hero')
        .select('*')
        .eq('id', 1)
        .maybeSingle()

      const hero = heroData
        ? {
            eyebrow: heroData.eyebrow || DEFAULT_HERO.eyebrow,
            title: heroData.title || DEFAULT_HERO.title,
            sub: heroData.sub || DEFAULT_HERO.sub,
            bgImg: storageService.getPublicUrl(heroData.bg_img),
            bgFit: heroData.bg_fit || heroData.bgFit || 'ambient',
          }
        : DEFAULT_HERO

      // 4. Fetch Marquee Announcements
      const { data: annData } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true })

      const marquee = (annData || []).map((a) => a.text).filter(Boolean)

      // 5. Fetch Reviews
      const { data: revData } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_active', true)

      const reviews = (revData || []).map((r) => ({
        id: r.id,
        author: r.author,
        stars: Number(r.stars || 5),
        text: r.text,
      }))

      // 6. Fetch Store Settings
      const { data: setDa } = await supabase
        .from('store_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle()

      const settings = setDa
        ? {
            whatsappNumber: setDa.whatsapp_number || DEFAULT_SETTINGS.whatsappNumber,
            freeShippingThreshold: Number(setDa.free_shipping_threshold || DEFAULT_SETTINGS.freeShippingThreshold),
            storeNotice: setDa.store_notice || DEFAULT_SETTINGS.storeNotice,
            customerCount: setDa.customer_count || DEFAULT_SETTINGS.customerCount,
          }
        : DEFAULT_SETTINGS

      const fullData = {
        products: products.length > 0 ? products : DEFAULT_PRODUCTS,
        hero,
        categories: categories.length > 0 ? categories : DEFAULT_CATEGORIES,
        marquee: marquee.length > 0 ? marquee : DEFAULT_MARQUEE,
        reviews,
        settings,
      }

      // Cache locally for offline/fast load fallback
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullData))
      } catch (err) {}

      return fullData
    } catch (err) {
      console.error('Failed to fetch CMS data from Supabase, returning local fallback:', err)
      return cmsRepository.loadData()
    }
  },

  saveData: (data) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    } catch (e) {}
  },
}
