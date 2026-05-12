# AIS Beauty Store — Source Code

Premium ecommerce website for AIS Beauty Store, a luxury beauty & wellness brand.

---

## Quick Start (Development)

```bash
npm install
PORT=3000 BASE_PATH=/ npm run dev
```

Open http://localhost:3000

---

## Production Build

```bash
PORT=3000 BASE_PATH=/ npm run build
```

Output goes to `dist/public/`. Serve the contents of `dist/public/` with any static host.

---

## Project Structure

```
src/
├── App.tsx                  # Root app, router, providers
├── main.tsx                 # React entry point
├── index.css                # Global CSS + Tailwind + design tokens
│
├── assets/                  # Logo and brand images
│   └── ais-logo-full.png
│
├── components/              # Shared UI components
│   ├── Navbar.tsx           # Sticky responsive navbar
│   ├── Footer.tsx           # Site footer with links & payments
│   ├── ProductCard.tsx      # Reusable product card
│   ├── CheckoutModal.tsx    # Full-screen checkout modal
│   └── ui/                  # shadcn/ui primitives (Button, Card, etc.)
│
├── lib/
│   ├── products.ts          # All product data (source of truth)
│   ├── checkout-context.tsx # Global checkout state (React Context)
│   └── utils.ts             # Utility helpers
│
└── pages/
    ├── home.tsx             # Homepage (/)
    ├── produk.tsx           # Product catalog (/produk)
    ├── produk-detail.tsx    # Product detail (/produk/:slug)
    ├── tentang-kami.tsx     # About us (/tentang-kami)
    ├── testimoni.tsx        # Testimonials (/testimoni)
    ├── blog.tsx             # Blog listing (/blog)
    ├── blog-detail.tsx      # Blog post (/blog/:slug)
    ├── faq.tsx              # FAQ (/faq)
    ├── kontak.tsx           # Contact (/kontak)
    ├── checkout.tsx         # Checkout page (/checkout)
    └── not-found.tsx        # 404 page
```

---

## Design System

### Colors (defined in src/index.css)
| Token          | Value           | Usage                    |
|----------------|-----------------|--------------------------|
| `--primary`    | Rose/blush pink | Buttons, accents         |
| `--background` | Cream white     | Page background          |
| `--foreground` | Dark charcoal   | Body text, footer bg     |
| `--muted`      | Soft gray       | Secondary text, borders  |

### Typography
- **Serif** — Cormorant Garamond (headings, logo, luxury text)
- **Sans** — Inter (body text, UI elements)

### Key Design Tokens
- Border radius: `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-full`
- Shadows: `shadow-sm`, `shadow-lg`, `shadow-xl`
- Spacing scale: 4px base (Tailwind default)

---

## Products (src/lib/products.ts)

All 5 products live in this single file. To add/edit a product:
1. Add an entry to the `products` array
2. Assign a unique `id`, `slug`, `name`, `price`, `category`
3. Import the product image into `src/assets/`
4. All pages auto-pick up the new product

### Current Products
| ID | Name              | Category      | Price         |
|----|-------------------|---------------|---------------|
| 1  | DVN Collagen      | Skincare      | Rp175.000     |
| 2  | Novia             | Feminine Care | Rp149.000     |
| 3  | S-GLOW            | Skincare      | Rp159.000     |
| 4  | Erojan            | Men's Health  | Rp185.000     |
| 5  | Bio-Lingzhi Pro   | Herbal        | Rp199.000     |

---

## Checkout Flow

All orders go through WhatsApp (+6289518220436).

1. User clicks "Beli Sekarang" anywhere on the site
2. `CheckoutModal` opens (global, via `CheckoutContext`)
3. User selects product, qty, fills form, picks payment method
4. On submit → formatted WhatsApp message is generated
5. User is redirected to `wa.me/6289518220436?text=...`

### Payment Methods
| Method  | Account         | Account Name    |
|---------|-----------------|-----------------|
| BCA     | 8610707565      | Nopa Setiyoko   |
| Mandiri | 1370024315588   | Nopa Setiyoko   |
| DANA    | 085226145581    | —               |
| GoPay   | 085226145581    | —               |
| COD     | Pay on delivery | —               |

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 19 + Vite 7                   |
| Styling     | TailwindCSS v4 + CSS custom props   |
| Routing     | Wouter                              |
| Animation   | Framer Motion                       |
| UI Library  | shadcn/ui (Radix primitives)        |
| Icons       | Lucide React                        |
| State       | React Context API                   |
| Data Fetch  | TanStack React Query (ready)        |
| Language    | TypeScript 5.9 (strict)             |

---

## Figma Compatibility

The design system uses a token-based approach compatible with Figma:

- **Colors** → map to Figma color styles (primary, background, foreground, muted, border)
- **Typography** → 2 text styles: Serif (Cormorant Garamond) + Sans (Inter)
- **Components** → each `src/components/` file = 1 Figma component
- **Spacing** → 4px grid (matches Figma 4px baseline grid)
- **Naming** → PascalCase components, kebab-case files

To recreate in Figma:
1. Install fonts: Cormorant Garamond + Inter from Google Fonts
2. Create color styles matching the CSS variables in `src/index.css`
3. Use Auto Layout with 4px/8px/16px/24px/32px spacing
4. Each page in Figma corresponds to a page file in `src/pages/`

---

## Deployment

This is a static frontend — deploy to any static host:

- **Vercel**: `npm run build` → deploy `dist/public/`
- **Netlify**: same, set publish dir to `dist/public`
- **GitHub Pages**: set base path in vite.config.ts
- **Any CDN**: serve `dist/public/` directory

> Note: Remove the PORT/BASE_PATH requirement from vite.config.ts if deploying outside Replit.

---

## Contact & Business Info

- WhatsApp: +6289518220436
- Email: aisbeauty.store@gmail.com
- Instagram: @aisbeautystore
