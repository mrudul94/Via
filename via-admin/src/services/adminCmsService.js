import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { storageService } from './storageService'

export const adminCmsService = {
  fetchStoreData: async () => {
    if (!isSupabaseConfigured() || !supabase) return null

    try {
      // Parallel concurrent queries via Promise.all
      const [
        { data: catData },
        { data: prodData },
        { data: heroData },
        { data: annData },
        { data: revData },
        { data: setDa },
      ] = await Promise.all([
        supabase.from('categories').select('*').order('priority', { ascending: true }),
        supabase.from('products').select('*').order('priority', { ascending: true }),
        supabase.from('hero').select('*').eq('id', 1).maybeSingle(),
        supabase.from('announcements').select('*').order('priority', { ascending: true }),
        supabase.from('reviews').select('*'),
        supabase.from('store_settings').select('*').eq('id', 1).maybeSingle(),
      ])

      const categories = (catData || []).map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        img: storageService.getPublicUrl(c.img),
        imgPath: c.img || '',
      }))

      const catMapById = new Map(categories.map((c) => [c.id, c.name]))
      const catMapByName = new Map(categories.map((c) => [c.name.toLowerCase(), c.id]))

      const products = (prodData || []).map((p) => {
        const catName = p.category_id ? (catMapById.get(p.category_id) || p.category_name) : p.category_name
        return {
          id: p.id,
          name: p.name,
          category: catName || 'General',
          categoryId: p.category_id,
          price: Number(p.price || 0),
          compareAt: p.compare_at ? Number(p.compare_at) : null,
          tag: p.tag || '',
          img: storageService.getPublicUrl(p.img),
          img2: storageService.getPublicUrl(p.img2),
          imgPath: p.img || '',
          img2Path: p.img2 || '',
          desc: p.description || '',
          material: p.material || '',
          care: p.care || '',
          isActive: p.is_active ?? true,
        }
      })

      const hero = heroData
        ? {
            eyebrow: heroData.eyebrow,
            title: heroData.title,
            sub: heroData.sub,
            bgImg: storageService.getPublicUrl(heroData.bg_img),
            bgImgPath: heroData.bg_img || '',
            bgFit: heroData.bg_fit || heroData.bgFit || 'ambient',
          }
        : {
            eyebrow: '✨ LUXURY EVERYDAY JEWELLERY',
            title: "Jewellery That Doesn't Quit On You",
            sub: 'Anti-tarnish • Water-safe • Sweatproof. Designed to be worn every single day — to work, to bed, in the shower.',
            bgImg: '',
            bgFit: 'ambient',
          }

      const marquee = (annData || []).map((a) => a.text).filter(Boolean)

      const reviews = (revData || []).map((r) => ({
        id: r.id,
        author: r.author,
        stars: Number(r.stars || 5),
        text: r.text,
      }))

      const settings = setDa
        ? {
            whatsappNumber: setDa.whatsapp_number,
            freeShippingThreshold: Number(setDa.free_shipping_threshold || 999),
            storeNotice: setDa.store_notice || '',
            customerCount: setDa.customer_count || '10,000+',
          }
        : {
            whatsappNumber: '918075915386',
            freeShippingThreshold: 999,
            storeNotice: '⚡ All orders ship with an anti-tarnish pouch and care card.',
            customerCount: '10,000+',
          }

      return { products, hero, categories, marquee, reviews, settings, catMapByName }
    } catch (err) {
      console.error('Error in fetchStoreData:', err)
      return null
    }
  },

  createProduct: async (prodForm, categoriesList = []) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')

    // Find category ID if matched by name
    const matchedCategory = categoriesList.find(
      (c) => c.name.toLowerCase() === (prodForm.category || '').toLowerCase()
    )

    const payload = {
      name: prodForm.name,
      category_name: prodForm.category || '',
      category_id: matchedCategory ? matchedCategory.id : null,
      price: Number(prodForm.price || 0),
      compare_at: prodForm.compareAt ? Number(prodForm.compareAt) : null,
      tag: prodForm.tag || null,
      img: prodForm.img || '',
      img2: prodForm.img2 || null,
      description: prodForm.desc || '',
      material: prodForm.material || '18K Gold Plated Stainless Steel',
      care: prodForm.care || 'Anti-tarnish, water-safe, sweatproof',
      is_active: true,
    }

    const { data, error } = await supabase.from('products').insert([payload]).select().single()
    if (error) throw error

    return {
      ...prodForm,
      id: data.id,
      img: storageService.getPublicUrl(data.img),
      img2: storageService.getPublicUrl(data.img2),
    }
  },

  updateProduct: async (id, updatedFields, categoriesList = []) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')

    const payload = {}
    if ('name' in updatedFields) payload.name = updatedFields.name
    if ('category' in updatedFields) {
      payload.category_name = updatedFields.category
      const matchedCategory = categoriesList.find(
        (c) => c.name.toLowerCase() === (updatedFields.category || '').toLowerCase()
      )
      payload.category_id = matchedCategory ? matchedCategory.id : null
    }
    if ('price' in updatedFields) payload.price = Number(updatedFields.price || 0)
    if ('compareAt' in updatedFields) payload.compare_at = updatedFields.compareAt ? Number(updatedFields.compareAt) : null
    if ('tag' in updatedFields) payload.tag = updatedFields.tag || null
    if ('img' in updatedFields) payload.img = updatedFields.img
    if ('img2' in updatedFields) payload.img2 = updatedFields.img2 || null
    if ('desc' in updatedFields) payload.description = updatedFields.desc
    if ('material' in updatedFields) payload.material = updatedFields.material
    if ('care' in updatedFields) payload.care = updatedFields.care
    payload.updated_at = new Date().toISOString()

    const { error } = await supabase.from('products').update(payload).eq('id', id)
    if (error) throw error
  },

  deleteProduct: async (id) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
  },

  updateHero: async (heroData) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')
    const payload = {
      eyebrow: heroData.eyebrow,
      title: heroData.title,
      sub: heroData.sub,
      bg_img: heroData.bgImg || '',
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase.from('hero').upsert({ id: 1, ...payload })
    if (error) throw error
  },

  saveCategories: async (categoriesList) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')
    const rows = categoriesList.map((c, index) => ({
      id: c.id || undefined,
      name: c.name,
      slug: c.slug || c.name.toLowerCase().replace(/\s+/g, '-'),
      img: c.img || '',
      priority: index + 1,
    }))
    const { error } = await supabase.from('categories').upsert(rows)
    if (error) throw error
  },

  saveMarquee: async (marqueeList) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')
    // Clear old & re-insert announcements cleanly
    await supabase.from('announcements').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    const rows = marqueeList.map((text, idx) => ({
      text,
      priority: idx + 1,
      is_active: true,
    }))
    const { error } = await supabase.from('announcements').insert(rows)
    if (error) throw error
  },

  saveReviews: async (reviewsList) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')
    await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    const rows = reviewsList.map((r) => ({
      author: r.author,
      stars: Number(r.stars || 5),
      text: r.text,
      is_active: true,
    }))
    const { error } = await supabase.from('reviews').insert(rows)
    if (error) throw error
  },

  updateSettings: async (settingsData) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')
    const payload = {
      whatsapp_number: settingsData.whatsappNumber,
      free_shipping_threshold: Number(settingsData.freeShippingThreshold || 999),
      store_notice: settingsData.storeNotice || '',
      customer_count: settingsData.customerCount || '10,000+',
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase.from('store_settings').upsert({ id: 1, ...payload })
    if (error) throw error
  },

  migrateLegacyDataToSupabase: async (legacyData) => {
    if (!isSupabaseConfigured() || !supabase) throw new Error('Supabase not configured')

    let migratedProductsCount = 0

    // 1. Migrate Categories
    if (legacyData.categories && legacyData.categories.length > 0) {
      await adminCmsService.saveCategories(legacyData.categories)
    }

    // Fetch newly saved categories map
    const { data: catRows } = await supabase.from('categories').select('*')
    const catMapByName = new Map((catRows || []).map((c) => [c.name.toLowerCase(), c.id]))

    // 2. Migrate Products (preserving text IDs like p_172...)
    if (legacyData.products && legacyData.products.length > 0) {
      for (const p of legacyData.products) {
        const catId = catMapByName.get((p.category || '').toLowerCase()) || null
        const prodPayload = {
          id: p.id, // Preserves legacy ID
          name: p.name,
          category_name: p.category || 'Necklaces',
          category_id: catId,
          price: Number(p.price || 0),
          compare_at: p.compareAt ? Number(p.compareAt) : null,
          tag: p.tag || null,
          img: p.img || '',
          img2: p.img2 || null,
          description: p.desc || '',
          material: p.material || '18K Gold Plated Stainless Steel',
          care: p.care || 'Anti-tarnish, water-safe, sweatproof',
          is_active: true,
        }
        await supabase.from('products').upsert(prodPayload)
        migratedProductsCount++
      }
    }

    // 3. Migrate Hero
    if (legacyData.hero) {
      await adminCmsService.updateHero(legacyData.hero)
    }

    // 4. Migrate Marquee
    if (legacyData.marquee && legacyData.marquee.length > 0) {
      await adminCmsService.saveMarquee(legacyData.marquee)
    }

    // 5. Migrate Reviews
    if (legacyData.reviews && legacyData.reviews.length > 0) {
      await adminCmsService.saveReviews(legacyData.reviews)
    }

    // 6. Migrate Settings
    if (legacyData.settings) {
      await adminCmsService.updateSettings(legacyData.settings)
    }

    return migratedProductsCount
  },
}
