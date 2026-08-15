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

let activeFetchPromise = null

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
   * Uses Promise.all to execute all table SELECT queries concurrently in parallel over HTTP.
   * Deduplicates simultaneous requests using an in-flight promise.
   */
  fetchFromSupabase: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('[Supabase CMS] VITE_SUPABASE_URL not configured. Using local fallback.')
      return cmsRepository.loadData()
    }

    if (activeFetchPromise) {
      return activeFetchPromise
    }

    activeFetchPromise = (async () => {
      try {
        // Parallel concurrent queries via Promise.all
        const [
          { data: catData, error: catErr },
          { data: prodData, error: prodErr },
          { data: heroData, error: heroErr },
          { data: annData, error: annErr },
          { data: revData, error: revErr },
          { data: setDa, error: setErr },
        ] = await Promise.all([
          supabase.from('categories').select('*').or('is_active.eq.true,is_active.is.null').order('priority', { ascending: true }),
          supabase.from('products').select('*').or('is_active.eq.true,is_active.is.null').order('priority', { ascending: true }),
          supabase.from('hero').select('*').eq('id', 1).maybeSingle(),
          supabase.from('announcements').select('*').or('is_active.eq.true,is_active.is.null').order('priority', { ascending: true }),
          supabase.from('reviews').select('*').or('is_active.eq.true,is_active.is.null'),
          supabase.from('store_settings').select('*').eq('id', 1).maybeSingle(),
        ])

        if (catErr) console.error('[Supabase CMS Error] Failed to fetch categories:', catErr)
        if (prodErr) {
          console.error('[Supabase CMS Error] Failed to fetch products:', prodErr)
          throw prodErr
        }
        if (heroErr) console.error('[Supabase CMS Error] Failed to fetch hero:', heroErr)
        if (annErr) console.error('[Supabase CMS Error] Failed to fetch announcements:', annErr)
        if (revErr) console.error('[Supabase CMS Error] Failed to fetch reviews:', revErr)
        if (setErr) console.error('[Supabase CMS Error] Failed to fetch store_settings:', setErr)

        const categories = (catData || []).map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug || c.name.toLowerCase().replace(/\s+/g, '-'),
          img: storageService.getPublicUrl(c.img),
        }))

        const catMapById = new Map(categories.map((c) => [c.id, c.name]))

        const products = (prodData || []).map((p) => {
          const resolvedCategory = p.category_id ? (catMapById.get(p.category_id) || p.category_name) : p.category_name
          return {
            id: p.id,
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

        const hero = heroData
          ? {
              eyebrow: heroData.eyebrow || DEFAULT_HERO.eyebrow,
              title: heroData.title || DEFAULT_HERO.title,
              sub: heroData.sub || DEFAULT_HERO.sub,
              bgImg: storageService.getPublicUrl(heroData.bg_img),
              bgFit: heroData.bg_fit || heroData.bgFit || 'ambient',
            }
          : DEFAULT_HERO

        const marquee = (annData || []).map((a) => a.text).filter(Boolean)

        const reviews = (revData || []).map((r) => ({
          id: r.id,
          author: r.author,
          stars: Number(r.stars || 5),
          text: r.text,
        }))

        const settings = setDa
          ? {
              whatsappNumber: setDa.whatsapp_number || DEFAULT_SETTINGS.whatsappNumber,
              freeShippingThreshold: Number(setDa.free_shipping_threshold || DEFAULT_SETTINGS.freeShippingThreshold),
              storeNotice: setDa.store_notice || DEFAULT_SETTINGS.storeNotice,
              customerCount: setDa.customer_count || DEFAULT_SETTINGS.customerCount,
            }
          : DEFAULT_SETTINGS

        const fullData = {
          products,
          hero,
          categories: categories.length > 0 ? categories : DEFAULT_CATEGORIES,
          marquee: marquee.length > 0 ? marquee : DEFAULT_MARQUEE,
          reviews,
          settings,
        }

        // Cache locally for offline/fast initial render fallback
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullData))
        } catch (err) {}

        return fullData
      } catch (err) {
        console.error('[Supabase CMS Failure] Cloud data fetch failed, using local cache:', err)
        return cmsRepository.loadData()
      } finally {
        activeFetchPromise = null
      }
    })()

    return activeFetchPromise
  },

  saveData: (data) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    } catch (e) {}
  },
}
