# VIA E-Commerce & Admin CMS — Supabase Setup Guide

This guide provides step-by-step instructions for connecting the **VIA Storefront** (`via-react`) and **VIA Admin CMS** (`via-admin`) to a production Supabase project.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **"New Project"**.
3. Name your project (e.g., `via-jewellery`) and set a strong database password.
4. Choose your preferred region and click **"Create New Project"**.

---

## 2. Execute SQL Database Migrations

1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation bar.
2. Click **"New Query"**.
3. Copy the entire contents of the migration file located at:
   `supabase/migrations/20260806000000_initial_schema.sql`
4. Paste the SQL code into the editor and click **"Run"**.
5. Verify that the following tables were created in the `public` schema:
   - `admin_profiles`
   - `categories`
   - `products`
   - `hero`
   - `announcements`
   - `reviews`
   - `store_settings`

---

## 3. Create the Administrator Account

1. Go to **Authentication -> Users** in your Supabase Dashboard.
2. Click **"Add User" -> "Create User"**.
3. Enter your administrator email (e.g. `admin@houseofvia.com`) and a strong password. Click **"Create User"**.
4. Copy the generated User **UUID** for this user.
5. Open the **SQL Editor** again and run the following insert query (replace `<USER_UUID>` and `<ADMIN_EMAIL>`):

```sql
INSERT INTO public.admin_profiles (user_id, email)
VALUES ('<USER_UUID>', '<ADMIN_EMAIL>');
```

---

## 4. Configure Storage Bucket (`via-media`)

1. Go to **Storage** in your Supabase Dashboard.
2. If the bucket `via-media` was not automatically created by the SQL script, click **"New Bucket"**.
3. Name the bucket `via-media`.
4. Toggle **"Public Bucket"** to **ON** (so product image URLs are accessible to visitors).
5. Click **"Save"**.

---

## 5. Configure Environment Variables

Get your **Project URL** and **API Key (anon public)** from **Project Settings -> API**.

### In `via-react/.env`:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### In `via-admin/.env`:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 6. Run & Migrate Legacy Data

1. Start both development servers:
   ```bash
   # Terminal 1: Storefront
   npm --prefix via-react run dev

   # Terminal 2: Admin CMS Dashboard
   npm --prefix via-admin run dev
   ```
2. Open `via-admin` in your browser (`http://localhost:5174`).
3. Sign in using your administrator email and password.
4. If legacy prototype data exists in your browser, click **"Migrate to Supabase Cloud"** on the top notification banner.
5. All your products, categories, hero banner, announcements, and reviews will be instantly imported into your Supabase PostgreSQL cloud database!
