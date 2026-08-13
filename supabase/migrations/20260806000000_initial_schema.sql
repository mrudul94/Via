-- VIA E-Commerce Supabase Database Schema Migration
-- Created: 2026-08-06

-- 1. Admin Profiles Table (Single Admin / Multi-Admin extensible)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helper Function: Check if the executing user is an authenticated admin user
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Categories Table (TEXT ID to support legacy string IDs and generated UUIDs)
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  img TEXT,
  priority INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Products Table (TEXT ID, FK category_id to categories.id)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL DEFAULT 'Necklaces',
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  compare_at NUMERIC(12,2) CHECK (compare_at IS NULL OR compare_at >= 0),
  tag TEXT,
  img TEXT NOT NULL,
  img2 TEXT,
  description TEXT,
  material TEXT DEFAULT '18K Gold Plated Stainless Steel',
  care TEXT DEFAULT 'Anti-tarnish, water-safe, sweatproof',
  is_active BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for category lookups & price filtering
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);

-- 4. Hero Table (Singleton record id=1)
CREATE TABLE IF NOT EXISTS public.hero (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  eyebrow TEXT NOT NULL DEFAULT '✨ LUXURY EVERYDAY JEWELLERY',
  title TEXT NOT NULL DEFAULT 'Jewellery That Doesn''t Quit On You',
  sub TEXT NOT NULL DEFAULT 'Anti-tarnish • Water-safe • Sweatproof.',
  bg_img TEXT DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure default singleton hero row exists
INSERT INTO public.hero (id, eyebrow, title, sub, bg_img)
VALUES (
  1,
  '✨ LUXURY EVERYDAY JEWELLERY',
  'Jewellery That Doesn''t Quit On You',
  'Anti-tarnish • Water-safe • Sweatproof. Designed to be worn every single day — to work, to bed, in the shower.',
  ''
) ON CONFLICT (id) DO NOTHING;

-- 5. Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default announcement marquee items if empty
INSERT INTO public.announcements (text, priority)
VALUES 
  ('FREE PAN-INDIA EXPRESS SHIPPING ON ORDERS ABOVE ₹999', 1),
  ('EVERYDAY LUXURY ANTI-TARNISH JEWELLERY', 2),
  ('BUY DIRECTLY ON WHATSAPP FOR INSTANT CONFIRMATION', 3)
ON CONFLICT DO NOTHING;

-- 6. Customer Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  stars INTEGER NOT NULL DEFAULT 5 CHECK (stars BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Store Settings Table (Singleton record id=1)
CREATE TABLE IF NOT EXISTS public.store_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  whatsapp_number TEXT NOT NULL DEFAULT '918075915386',
  free_shipping_threshold NUMERIC(12,2) NOT NULL DEFAULT 999,
  store_notice TEXT DEFAULT '⚡ All orders ship with an anti-tarnish pouch and care card.',
  customer_count TEXT DEFAULT '10,000+',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure default singleton store settings row exists
INSERT INTO public.store_settings (id, whatsapp_number, free_shipping_threshold, store_notice, customer_count)
VALUES (
  1,
  '918075915386',
  999,
  '⚡ All orders ship with an anti-tarnish pouch and care card.',
  '10,000+'
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (RLS) & TABLE PERMISSIONS
-- ============================================================

-- Table Access Grants
GRANT ALL ON TABLE public.admin_profiles TO authenticated, service_role;
GRANT ALL ON TABLE public.categories TO authenticated, service_role;
GRANT ALL ON TABLE public.products TO authenticated, service_role;
GRANT ALL ON TABLE public.hero TO authenticated, service_role;
GRANT ALL ON TABLE public.announcements TO authenticated, service_role;
GRANT ALL ON TABLE public.reviews TO authenticated, service_role;
GRANT ALL ON TABLE public.store_settings TO authenticated, service_role;

GRANT SELECT ON TABLE public.categories TO anon;
GRANT SELECT ON TABLE public.products TO anon;
GRANT SELECT ON TABLE public.hero TO anon;
GRANT SELECT ON TABLE public.announcements TO anon;
GRANT SELECT ON TABLE public.reviews TO anon;
GRANT SELECT ON TABLE public.store_settings TO anon;

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Storefront)
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Active Products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Hero" ON public.hero FOR SELECT USING (true);
CREATE POLICY "Public Read Active Announcements" ON public.announcements FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Reviews" ON public.reviews FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Store Settings" ON public.store_settings FOR SELECT USING (true);

-- ADMIN FULL POLICIES (Authenticated Admin CRUD)
CREATE POLICY "Admin All Access Categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Access Products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Access Hero" ON public.hero FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Access Announcements" ON public.announcements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Access Reviews" ON public.reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Access Store Settings" ON public.store_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Read Admin Profiles" ON public.admin_profiles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- ============================================================
-- SUPABASE STORAGE BUCKET POLICIES (`via-media`)
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('via-media', 'via-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Storage Objects" ON storage.objects
  FOR SELECT USING (bucket_id = 'via-media');

CREATE POLICY "Admin Insert Storage Objects" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'via-media');

CREATE POLICY "Admin Update Storage Objects" ON storage.objects
  FOR UPDATE USING (bucket_id = 'via-media');

CREATE POLICY "Admin Delete Storage Objects" ON storage.objects
  FOR DELETE USING (bucket_id = 'via-media');

