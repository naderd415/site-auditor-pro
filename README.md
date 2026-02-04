# BestToolsHub - Free Online Tools Platform

🎉 **2026 Ready!** | Fully optimized for **GEO (Generative Engine Optimization)**

A comprehensive suite of browser-based tools for image editing, PDF manipulation, text processing, color utilities, calculators, QR codes, and SEO diagnostics. All processing happens client-side for maximum privacy and speed.

## 🌐 Live Site
**URL**: [https://besttoolshub.online](https://besttoolshub.online)

---

## ✨ Latest Updates (February 2026)

### 📊 Google Analytics Integration (NEW!)
- **Automatic Injection**: Google Analytics script loads automatically when configured
- **Page View Tracking**: All route changes tracked automatically via `PageViewTracker` component
- **Custom Events**: Use `trackGAEvent()` for custom event tracking
- **Validation**: GA ID format validated (G-XXXXXXXXXX, UA-XXXXXXXX-X, AW-XXXXXXXXXX)
- **Configure in Admin**: Navigate to Admin → Integrations → Google Analytics

### 📢 Advanced Ads Management System (February 2026)
Complete overhaul of the ad management system with professional controls:

#### Google AdSense (Primary Provider)
- Client ID validation (ca-pub-XXXXXXXXXXXXXXXX format)
- Global enable/disable toggle
- Auto-injection of AdSense script when enabled

#### Adsterra Integration
- Top Banner Ad (728x90) with toggle
- Sidebar Ad (300x250) with toggle
- Delayed loading (3-5s) for Core Web Vitals

#### Custom Ad Slots (6 Placements)
Each slot includes:
- **Ad Name/Label** clearly displayed
- **Enable/Disable Toggle** next to each slot
- **Recommended Size** from Google's best practices
- **Code Textarea** for custom ad code

| Slot | Recommended Size | Placement |
|------|------------------|-----------|
| Header | 728x90 (Leaderboard) | Below navigation |
| Sidebar | 300x250 (Medium Rectangle) | Side of content |
| Footer | 728x90 (Leaderboard) | Above footer |
| In-Content | 336x280 (Large Rectangle) | Within tool pages |
| Between Sections | 970x250 (Billboard) | Homepage sections |
| Mobile Top | 320x50 (Mobile Banner) | Mobile header |

#### Google Recommended Banner Sizes Reference
Built-in reference guide showing all Google-recommended sizes:
- Leaderboard (728x90)
- Large Rectangle (336x280)
- Medium Rectangle (300x250)
- Wide Skyscraper (160x600)
- Skyscraper (120x600)
- Large Banner (970x90)
- Billboard (970x250)
- Mobile Banner (320x50)
- Large Mobile Banner (320x100)

### 🔐 Password-Only Admin Authentication
- No email required - password only login
- Password obfuscated with Base64 encoding
- SHA-256 hashing with constant-time comparison
- 24-hour session expiry in sessionStorage
- No external auth dependencies

### 🔍 SEO & AI Optimization (GEO)
- JSON-LD Schema markup on all tool pages
- robots.txt allows AI crawlers (GPTBot, CCBot, PerplexityBot)
- Optimized meta tags for AI search engines
- Vercel Speed Insights integration

---

## 🛡️ Security Features

| Protection | Status | Implementation |
|------------|--------|----------------|
| XSS Prevention | ✅ | DOMPurify + Content Validation |
| SSRF Protection | ✅ | Private IP/Hostname Blocking |
| Rate Limiting | ✅ | 1 req/min for Speed Test |
| Script Injection | ✅ | Whitelist-only External Scripts |
| SQL Injection | ✅ | Supabase SDK + Prepared Statements |
| GA ID Injection | ✅ | Regex Validation + Encoding |
| Ad Code XSS | ✅ | Multi-layer Validation |
| AdSense Client ID | ✅ | Regex Validation (ca-pub-XXXXXXXXXXXXXXXX) |
| Admin Password | ✅ | SHA-256 Hash + Constant-time Compare |

### Security Details

#### 1. XSS Protection (`src/lib/adCodeValidator.ts`)
- Inline scripts blocked - only external scripts from trusted domains
- Trusted domain whitelist: Google AdSense, Adsterra, Media.net
- Forbidden tags: `<iframe>`, `<object>`, `<embed>`, `<form>`, `<svg>`, etc.
- Event handler blocking (100+ handlers)
- DOMPurify sanitization layer

#### 2. Google Analytics Security (`src/lib/siteConfig.ts`)
- Regex validation for GA ID formats
- URL encoding with `encodeURIComponent()`
- Safe script injection using `textContent`

#### 3. Admin Authentication
- Password stored as Base64-encoded obfuscation
- SHA-256 hashing before comparison
- Constant-time comparison prevents timing attacks
- Session-based with 24-hour expiry

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Build tool & dev server |
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Component library |
| **React Router** | Client-side routing |
| **Lovable Cloud** | Backend (Edge Functions, Storage) |
| **React Helmet** | SEO meta management |
| **Lucide React** | Icon library |
| **Vercel Speed Insights** | Performance monitoring |

---

## 📁 Project Structure

```
├── public/
│   ├── assets/           # Static assets
│   ├── manifest.json     # PWA manifest
│   ├── robots.txt        # SEO & AI crawler rules
│   ├── sitemap.xml       # XML sitemap
│   └── sw.js             # Service Worker for PWA
│
├── src/
│   ├── components/
│   │   ├── admin/        # Admin components
│   │   │   ├── AdsManager.tsx      # Advanced ads management UI
│   │   │   └── ErrorLogViewer.tsx  # Error log viewer
│   │   │
│   │   ├── ads/          # Ad components
│   │   │   ├── AdsterraTop.tsx
│   │   │   ├── AdsterraSidebar.tsx
│   │   │   └── GoogleAdsenseLoader.tsx
│   │   │
│   │   ├── home/         # Homepage components
│   │   ├── layout/       # Layout components
│   │   ├── tools/        # Tool-specific components
│   │   └── ui/           # shadcn/ui components
│   │
│   ├── hooks/
│   │   ├── useSimpleAdminAuth.ts  # Password-only auth hook
│   │   ├── use-mobile.tsx
│   │   └── useScrollDirection.ts
│   │
│   ├── lib/
│   │   ├── i18n/              # Internationalization (EN/AR/FR)
│   │   ├── siteConfig.ts      # Site configuration + GA injection
│   │   ├── adCodeValidator.ts # XSS protection for ads
│   │   └── utils.ts
│   │
│   ├── pages/
│   │   ├── Admin.tsx          # Admin dashboard
│   │   ├── Index.tsx          # Homepage
│   │   └── tools/             # 40+ tool pages
│   │
│   ├── GoogleAnalyticsLoader.tsx  # GA auto-injection component
│   └── App.tsx                # Main app with routing
│
└── supabase/
    └── config.toml            # Supabase configuration
```

---

## 📊 Analytics System

### Google Analytics Integration

The app now includes proper Google Analytics integration:

```tsx
// In App.tsx - Automatic loading
<GoogleAnalyticsLoader />  // Loads GA script if configured
<PageViewTracker />        // Tracks all route changes

// Custom event tracking
import { trackGAEvent } from '@/components/GoogleAnalyticsLoader';
trackGAEvent('tool_used', { tool_name: 'image-compressor' });
```

### Configuration
1. Go to Admin → Integrations
2. Enter your Google Analytics ID (G-XXXXXXXXXX)
3. Save changes
4. GA will automatically load on next page refresh

### Local Statistics
The app also tracks local statistics stored in localStorage:
- Total visits
- Today's visits
- Unique visitors
- Page views per route
- Hourly traffic data
- Device types (Mobile/Desktop/Tablet)
- Browser distribution

---

## 📝 Admin Dashboard

Access: `/admin`

### Authentication
- **Password-only login** - No email required
- Password is validated against SHA-256 hash
- 24-hour session with sessionStorage

### Dashboard Sections

1. **Dashboard** - Overview with stats and quick actions
2. **Content** - Hero, About, Contact page editing
3. **Ads** - Advanced ad management with:
   - Google AdSense configuration
   - Adsterra toggles
   - 6 custom ad placements
   - Google recommended sizes guide
4. **SEO** - Meta tags, keywords, social links
5. **Analytics** - Detailed traffic analytics
6. **Appearance** - Theme, language, site identity
7. **Integrations** - Google Analytics, AdSense scripts
8. **Settings** - Export config, error logs

---

## 🎨 Design System

Colors are defined as CSS variables in `src/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 180 100% 50%;
  /* ... */
}
```

Use semantic classes:
- ✅ `bg-background`, `text-foreground`, `border-border`
- ❌ `bg-white`, `text-black`

---

## 🌍 Internationalization (i18n)

Supports **English**, **Arabic**, and **French**.

```tsx
const { t, isRTL, language, setLanguage } = useLanguage();
```

---

## 🔐 Environment Variables

Auto-managed by Lovable Cloud:

```env
VITE_SUPABASE_URL=<auto>
VITE_SUPABASE_PUBLISHABLE_KEY=<auto>
VITE_SUPABASE_PROJECT_ID=<auto>
```

**Do NOT edit `.env` manually.**

---

## 📦 Deployment

- **Vercel**: `vercel.json` handles SPA routing
- **Netlify**: `netlify.toml` configures redirects

---

## 🧪 Local Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## ➕ Adding New Tools

1. Create page in `src/pages/tools/NewTool.tsx`
2. Add route in `src/App.tsx`
3. Add to `allTools` in `ToolsGrid.tsx`
4. Add translations in `translations.ts`

---

## 🤝 Contributing

1. Create a feature branch
2. Follow existing patterns
3. Add translations for all 3 languages
4. Test on mobile and desktop
5. Submit PR with clear description

---

## 📄 License

This project is proprietary. All rights reserved.

---

**Built with ❤️ using Lovable**
