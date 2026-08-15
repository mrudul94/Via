import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useToast } from '../../../context/ToastContext'
import {
  cmsRepository,
  DEFAULT_PRODUCTS,
  DEFAULT_HERO,
  DEFAULT_CATEGORIES,
  DEFAULT_MARQUEE,
  DEFAULT_REVIEWS,
  DEFAULT_SETTINGS,
} from '../services/cmsRepository'
import { isSupabaseConfigured, supabase } from '../../../lib/supabaseClient'

const CMSContext = createContext(null)

export function CMSProvider({ children }) {
  const toast = useToast()
  const [data, setData] = useState(() => cmsRepository.loadData())
  const [isLoading, setIsLoading] = useState(true)

  // Fetch initial data from Supabase Cloud DB
  const refreshData = useCallback(async () => {
    try {
      const dbData = await cmsRepository.fetchFromSupabase()
      if (dbData) {
        setData(dbData)
      }
    } catch (err) {
      console.warn('CMS Context refresh error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  // Setup Supabase Realtime Sync, Focus Re-fetch & Polling Fallback
  useEffect(() => {
    // Auto refresh whenever user focuses or switches back to this tab
    const handleFocus = () => {
      refreshData()
    }
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshData()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibility)

    // Polling fallback every 20 seconds for cross-device background sync
    const pollTimer = setInterval(() => {
      refreshData()
    }, 20000)

    // Supabase Realtime Listener for instant database changes
    let channel
    if (isSupabaseConfigured() && supabase) {
      channel = supabase
        .channel('public:cms_changes')
        .on('postgres_changes', { event: '*', schema: 'public' }, () => {
          refreshData()
          toast('✨ Catalog updated live!')
        })
        .subscribe()
    }

    return () => {
      if (channel && supabase) supabase.removeChannel(channel)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibility)
      clearInterval(pollTimer)
    }
  }, [refreshData, toast])

  const findProduct = useCallback(
    (id) => data.products.find((p) => String(p.id) === String(id)) || null,
    [data.products]
  )

  const value = {
    products: data.products,
    hero: data.hero,
    categories: data.categories,
    marquee: data.marquee,
    reviews: data.reviews,
    settings: data.settings,
    isLoading,
    refreshData,
    findProduct,
  }

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>
}

export const useCMS = () => useContext(CMSContext)
