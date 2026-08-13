# VIA — Everyday Luxury Jewellery E-Commerce Platform

A production-ready e-commerce platform built for **VIA Everyday Luxury Jewellery** featuring a public luxury storefront (`via-react`) and an admin control panel (`via-admin`) backed by **Supabase (PostgreSQL, Authentication, and Cloud Storage)**.

---

## 🌟 Key Features

* **Public Luxury Storefront (`via-react`)**:
  * 100% public browsing — no mandatory customer accounts or logins.
  * Instant category filtering, product search, and responsive image carousel views.
  * Cart drawer state persistence and direct WhatsApp ordering with complete customer delivery details.
  * Custom dark luxury design tokens (`tokens.css`, `base.css`, `pages.css`).

* **Production Admin CMS (`via-admin`)**:
  * Single-administrator authentication via Supabase Email & Password.
  * Cloud image uploads to Supabase Storage bucket (`via-media`).
  * Real-time product CRUD, hero banner editor, category manager, announcement marquee editor, customer review manager, and store settings editor.
  * Built-in one-click legacy `localStorage` migration tool.
  * JSON backup import and export capabilities.

* **Backend Architecture**:
  * **Database**: Supabase PostgreSQL.
  * **Auth**: Supabase Auth (Email & Password).
  * **Storage**: Supabase Storage (`via-media`).
  * **Security**: Row Level Security (RLS) policies enforcing read-only public access and authenticated-admin write access.

---

## 🚀 Quick Start

### 1. Installation
```bash
# Install dependencies for both storefront and admin
npm --prefix via-react install
npm --prefix via-admin install
```

### 2. Configure Backend
Follow [SETUP.md](file:///e:/via-site-final/SETUP.md) for full instructions on creating your Supabase project, executing SQL migrations, creating your storage bucket, and adding environment variables.

### 3. Local Development
```bash
# Run storefront (Port 5173)
npm --prefix via-react run dev

# Run admin dashboard (Port 5174)
npm --prefix via-admin run dev
```

### 4. Production Build
```bash
# Build storefront
npm --prefix via-react run build

# Build admin dashboard
npm --prefix via-admin run build
```
