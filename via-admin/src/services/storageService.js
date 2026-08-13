import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const BUCKET_NAME = 'via-media'

export const storageService = {
  /**
   * Returns a usable public URL for an image.
   * If input is a storage object path (e.g., "products/123.jpg"), generates public CDN URL.
   * If input is already a full HTTP(S) URL or Base64 string, returns it directly.
   */
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

  /**
   * Uploads a File object to Supabase Storage in the specified folder.
   * Returns relative storage object path (e.g., "products/172295000-hoops.png").
   */
  uploadFile: async (file, folder = 'products') => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    }

    if (!file) throw new Error('No file provided for upload')

    // Basic MIME type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid image format. Please upload JPG, PNG, WebP, or SVG.')
    }

    // 8MB size limit
    if (file.size > 8 * 1024 * 1024) {
      throw new Error('Image size exceeds 8MB limit.')
    }

    const fileExt = file.name.split('.').pop() || 'png'
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    })

    if (error) {
      console.error('Storage upload error:', error)
      throw new Error(error.message || 'Failed to upload image to cloud storage.')
    }

    return data.path
  },

  /**
   * Deletes a file from Supabase Storage by its relative storage path.
   */
  deleteFile: async (storagePath) => {
    if (!storagePath || storagePath.startsWith('http') || storagePath.startsWith('data:')) return
    if (!isSupabaseConfigured() || !supabase) return

    try {
      await supabase.storage.from(BUCKET_NAME).remove([storagePath])
    } catch (err) {
      console.warn('Failed to delete storage file:', err)
    }
  },
}
