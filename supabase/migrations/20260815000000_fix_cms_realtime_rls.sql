-- Migration: Fix CMS Realtime Publication & Public RLS Permissions
-- Date: 2026-08-15

-- 1. Ensure column defaults and backfill any NULL is_active rows
ALTER TABLE public.products ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE public.categories ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE public.announcements ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE public.reviews ALTER COLUMN is_active SET DEFAULT true;

UPDATE public.products SET is_active = true WHERE is_active IS NULL;
UPDATE public.categories SET is_active = true WHERE is_active IS NULL;
UPDATE public.announcements SET is_active = true WHERE is_active IS NULL;
UPDATE public.reviews SET is_active = true WHERE is_active IS NULL;

-- 2. Update Public Read Policies to allow reading active products/categories/announcements/reviews
DROP POLICY IF EXISTS "Public Read Active Products" ON public.products;
CREATE POLICY "Public Read Active Products" ON public.products 
  FOR SELECT USING (is_active = true OR is_active IS NULL);

DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;
CREATE POLICY "Public Read Categories" ON public.categories 
  FOR SELECT USING (is_active = true OR is_active IS NULL);

DROP POLICY IF EXISTS "Public Read Active Announcements" ON public.announcements;
CREATE POLICY "Public Read Active Announcements" ON public.announcements 
  FOR SELECT USING (is_active = true OR is_active IS NULL);

DROP POLICY IF EXISTS "Public Read Active Reviews" ON public.reviews;
CREATE POLICY "Public Read Active Reviews" ON public.reviews 
  FOR SELECT USING (is_active = true OR is_active IS NULL);

-- 3. Idempotently Enable Supabase Realtime Publication for CMS Tables
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'categories'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'hero'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.hero;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'announcements'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.announcements;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'reviews'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'store_settings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.store_settings;
  END IF;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Realtime publication setup handled: %', SQLERRM;
END $$;
