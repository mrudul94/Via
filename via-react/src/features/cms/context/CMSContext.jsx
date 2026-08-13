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

  // Setup Supabase Realtime / Cross-tab Broadcast sync & Focus Re-fetch
  useEffect(() => {
    let bc
    try {
      bc = new BroadcastChannel('via_cms_channel')
      bc.onmessage = () => {
        refreshData()
        toast('✨ Storefront catalog refreshed live!')
      }
    } catch (e) {}

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

    // Polling fallback every 4 seconds for instant side-by-side window updates
    const pollTimer = setInterval(() => {
      refreshData()
    }, 4000)

    // Optional Supabase Realtime Listener
    let channel
    if (isSupabaseConfigured() && supabase) {
      channel = supabase
        .channel('public:cms_changes')
        .on('postgres_changes', { event: '*', schema: 'public' }, () => {
          refreshData()
          toast('✨ Storefront catalog refreshed live!')
        })
        .subscribe()
    }

    return () => {
      if (bc) bc.close()
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
