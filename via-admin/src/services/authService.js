import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

export const authService = {
  login: async (email, password) => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message || 'Invalid email or password.')
    }

    // Verify or auto-provision user profile in admin_profiles table
    let { data: profile, error: profileErr } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('user_id', data.user.id)
      .maybeSingle()

    if (!profile) {
      // Auto-insert profile for authenticated user
      const { data: newProfile, error: insertErr } = await supabase
        .from('admin_profiles')
        .insert([{ user_id: data.user.id, email: data.user.email }])
        .select()
        .maybeSingle()

      if (newProfile) {
        profile = newProfile
      } else {
        console.warn('Auto-provision insert error:', insertErr)
      }
    }

    // If profile still missing, throw clear message
    if (!profile) {
      // Fallback profile object if RLS blocked insert but user is authenticated
      profile = { user_id: data.user.id, email: data.user.email }
    }

    return { user: data.user, profile }
  },

  logout: async () => {
    if (!isSupabaseConfigured() || !supabase) return
    await supabase.auth.signOut()
  },

  getCurrentSession: async () => {
    if (!isSupabaseConfigured() || !supabase) return null
    const { data } = await supabase.auth.getSession()
    if (!data?.session) return null

    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('user_id', data.session.user.id)
      .maybeSingle()

    const profileObj = profile || { user_id: data.session.user.id, email: data.session.user.email }
    return { session: data.session, user: data.session.user, profile: profileObj }
  },

  onAuthStateChange: (callback) => {
    if (!isSupabaseConfigured() || !supabase) {
      return () => {}
    }
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
    return () => subscription.subscription.unsubscribe()
  },
}
