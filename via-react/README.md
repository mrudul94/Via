# VIA Jewellery — React + Vite

The VIA storefront rebuilt as a React single-page app with Vite and plain CSS
(the original Tailwind design is ported to a CSS design-token system in
`src/styles/`).

## Run it

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  main.jsx            App entry — Router + Cart/Toast providers
  App.jsx             Route table
  config.js           WhatsApp number, Instagram handle, helpers
  data/products.js    Product catalog
  utils/format.js     ₹ formatting
  context/
    CartContext.jsx   Cart state (persisted to localStorage) + WhatsApp checkout
    ToastContext.jsx  Toast notifications
  components/         Header, Footer, Marquee, MobileNav, SearchOverlay,
                     CartDrawer, WhatsAppFloat, ProductCard, Reveal, Layout, Icon
  pages/             Home, Shop, Product, Checkout
  styles/            tokens.css, base.css, pages.css (imported via index.css)
```

## Routes

- `/`                Home
- `/shop`            Shop (supports `?cat=Necklaces` etc.)
- `/product/:id`     Product detail (e.g. `/product/p1`)
- `/checkout`        Checkout

## Before you launch

1. **WhatsApp number** — set `VIA_WHATSAPP_NUMBER` in `src/config.js`.
2. **Products** — edit `src/data/products.js` (names, prices, real photos).
3. **Instagram** — update `VIA_INSTAGRAM` in `src/config.js`.
4. Discount code + newsletter forms are visual only — wire them to a backend later.

## Hosting

Deploy the `dist/` folder to Netlify / Vercel / Cloudflare Pages. Because this
is a client-side-routed SPA, configure a catch-all rewrite to `index.html`
(the included `public/_redirects` handles this on Netlify; Vercel/Cloudflare
have equivalent SPA-fallback settings).
