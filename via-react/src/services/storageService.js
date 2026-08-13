import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const BUCKET_NAME = 'via-media'

export const storageService = {
  getPublicUrl: (pathOrUrl) => {
    if (!pathOrUrl) return ''
    if (typeof pathOrUrl !== 'string') return ''
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://') || pathOrUrl.startsWith('data:')) {
      return pathOrUrl
    }
    if (!isSupabaseConfigured() || !supabase) return pathOrUrl
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(pathOrUrl)
    return data?.publicUrl || pathOrUrl
  },
}
