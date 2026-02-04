# BestToolsHub - Free Online Tools Platform

🎉 **2026 New Year Ready!** | Fully optimized for **GEO (Generative Engine Optimization)**

A comprehensive suite of browser-based tools for image editing, PDF manipulation, text processing, color utilities, calculators, QR codes, and SEO diagnostics. All processing happens client-side for maximum privacy and speed.

## 🌐 Live Site
**URL**: [https://besttoolshub.online](https://besttoolshub.online)

---

## ✨ Latest Updates (January 2026)

### 🧮 Work Hours & Income Calculator (NEW!)
A comprehensive financial calculator for freelancers, employees, and business owners:
- **Hourly Rate Calculator**: Calculate your effective hourly rate from total income
- **Income Calculator**: Compute earnings from hourly rate with overtime support (1.5x after 40 hrs)
- **Tax Calculator**: Determine taxes owed and net income after deductions
- **Freelance Project Calculator**: Calculate project profits after taxes and expenses
- Full SEO optimization targeting Western freelance/gig economy markets
- Available at `/tools/work-hours-calculator`

### 🔐 Enhanced Admin Error Logging
- `useAdminAuth` hook now logs all authentication errors to localStorage
- Error logs can be retrieved with `getAdminErrorLogs()` function
- Last 20 errors stored for debugging purposes
- Helps diagnose admin page issues without console access

### 📢 Advanced Ad Management System (February 2026)
- **Google AdSense Integration**: Primary ad provider with client ID validation (ca-pub-XXXXXXXXXXXXXXXX)
- **Adsterra Ads**: Top banner and sidebar with individual enable/disable toggles
- **Custom Ad Slots**: Header, Sidebar, Footer, In-Content - each with enable/disable switch
- **Toggle Controls**: Every ad slot can be turned on/off from the Admin Dashboard
- **Delayed Loading**: Ads load after 3-5 seconds or first scroll for better Core Web Vitals
- **Fixed Dimensions**: All ad containers have fixed sizes to prevent CLS (Layout Shift)

### 🔍 SEO & AI Optimization (GEO)
- JSON-LD Schema markup on all tool pages (WebApplication + BreadcrumbList)
- robots.txt allows AI crawlers (GPTBot, CCBot, PerplexityBot, Claude-Web)
- Descriptive meta tags optimized for AI search engines
- Vercel Speed Insights integration for performance monitoring

### 🔒 Security Hardening (January 2026)

#### 1. XSS Protection for Ad Code (`src/lib/adCodeValidator.ts`)
- **Inline Script Blocking**: All inline scripts are blocked - only external scripts from trusted domains allowed
- **Trusted Domain Whitelist**: Google AdSense, Adsterra, Media.net, and other verified ad networks
- **Forbidden Tags**: Blocks `<iframe>`, `<object>`, `<embed>`, `<form>`, `<input>`, `<svg>`, `<link>`, `<meta>`, `<base>`, etc.
- **Dangerous Protocols**: Blocks `javascript:`, `data:`, `vbscript:`, `file:`, `ftp:`, `blob:`
- **Event Handler Blocking**: Blocks 100+ event handlers (`onclick`, `onerror`, `onload`, etc.)
- **DOMPurify Sanitization**: Additional layer of HTML sanitization

#### 2. Google Analytics Security (`src/lib/siteConfig.ts`)
- **GA ID Validation**: Regex validation for G-XXXXXXXXXX, UA-XXXXXXXX-X, AW-XXXXXXXXXX formats
- **URL Encoding**: Uses `encodeURIComponent()` for GA ID in script URL
- **Safe Script Injection**: Uses `textContent` instead of `innerHTML` for inline configuration

#### 3. Website Speed Test Protection (`src/pages/tools/WebsiteSpeedTest.tsx`)
- **Rate Limiting**: Maximum 1 request per minute using localStorage timestamp
- **SSRF Protection**: Blocks private IP addresses and internal hostnames:
  - `localhost`, `127.x.x.x`, `192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`
  - IPv6 localhost (`::1`, `[::1]`)
  - IPv6 private ranges (`fc00::/7`, `fe80::/10`)
  - `.local` domains
- **Cooldown Display**: Shows remaining seconds before next request allowed

#### 4. Ad Slot Script Execution (`AdSenseSlot.tsx` & `DynamicAdSlot.tsx`)
- **External Scripts Only**: Only executes `<script src="...">` from validated domains
- **No textContent Copy**: Prevents execution of malicious inline code
- **DOM Validation**: Scripts validated before DOM insertion

#### 5. Secure Authentication System
- **Separate Roles Table**: `user_roles` table isolated from `profiles` (prevents privilege escalation)
- **RLS Policies**: Row Level Security on all sensitive tables
- **SECURITY DEFINER Functions**: `has_role()` function prevents RLS recursion
- **Server-side Validation**: No client-side admin checks (localStorage/hardcoded)

---

## 🛡️ Security Checklist

| Protection | Status | Implementation |
|------------|--------|----------------|
| XSS Prevention | ✅ | DOMPurify + Content Validation |
| SSRF Protection | ✅ | Private IP/Hostname Blocking |
| Rate Limiting | ✅ | 1 req/min for Speed Test |
| Script Injection | ✅ | Whitelist-only External Scripts |
| SQL Injection | ✅ | Supabase SDK + Prepared Statements |
| Auth Security | ✅ | Server-side RLS + Separate Roles |
| GA ID Injection | ✅ | Regex Validation + Encoding |
| Ad Code XSS | ✅ | Multi-layer Validation |
| AdSense Client ID | ✅ | Regex Validation (ca-pub-XXXXXXXXXXXXXXXX) |

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
│   ├── assets/           # Static assets (logos, favicons)
│   ├── manifest.json     # PWA manifest
│   ├── robots.txt        # SEO & AI crawler rules
│   ├── sitemap.xml       # XML sitemap
│   └── sw.js             # Service Worker for PWA
│
├── src/
│   ├── components/
│   │   ├── home/         # Homepage components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ToolsGrid.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── ToolCard.tsx
│   │   │   └── AdSpace.tsx
│   │   │
│   │   ├── layout/       # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── tools/        # Tool-specific components
│   │   │   └── ToolPageLayout.tsx  # Shared tool page wrapper
│   │   │
│   │   ├── ui/           # shadcn/ui components
│   │   │
│   │   ├── AdsterraBanner.tsx   # Adsterra ad integration
│   │   ├── DynamicAdSlot.tsx    # Dynamic ad injection from Admin
│   │   ├── NewYearBanner.tsx    # 2026 New Year celebratory banner
│   │   ├── ChristmasEffects.tsx # Snowfall & festive decorations
│   │   ├── FAQ.tsx              # FAQ accordion
│   │   └── NavLink.tsx          # Active nav link
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useScrollDirection.ts
│   │   └── useVisitorTracking.ts
│   │
│   ├── lib/
│   │   ├── i18n/              # Internationalization
│   │   │   ├── index.ts
│   │   │   ├── translations.ts  # EN/AR/FR translations
│   │   │   └── LanguageContext.tsx
│   │   │
│   │   ├── qr/                # QR code templates
│   │   │   └── templates.ts
│   │   │
│   │   ├── seo/               # SEO configurations
│   │   │   └── toolsSEO.ts
│   │   │
│   │   ├── siteConfig.ts      # Site configuration
│   │   └── utils.ts           # Utility functions
│   │
│   ├── pages/
│   │   ├── Index.tsx          # Homepage
│   │   ├── Tools.tsx          # Tools listing
│   │   ├── Admin.tsx          # Admin dashboard
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Privacy.tsx
│   │   ├── Terms.tsx
│   │   ├── NotFound.tsx
│   │   │
│   │   └── tools/             # Individual tool pages
│   │       ├── ImageCompressor.tsx
│   │       ├── ImageConverter.tsx
│   │       ├── PDFMerge.tsx
│   │       ├── QRGenerator.tsx
│   │       ├── WebsiteSpeedTest.tsx
│   │       ├── BrokenLinksChecker.tsx
│   │       └── ... (40+ tools)
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts      # Auto-generated Supabase client
│   │       └── types.ts       # Auto-generated types
│   │
│   ├── App.tsx                # Main app with routing
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles & design tokens
│
├── supabase/
│   └── config.toml            # Supabase configuration
│
├── vercel.json                # Vercel deployment config
├── netlify.toml               # Netlify deployment config
└── vite.config.ts             # Vite configuration
```

---

## 🧭 Routing Logic

Routes are defined in `src/App.tsx` using React Router v6:

```tsx
<Routes>
  {/* Main Pages */}
  <Route path="/" element={<Index />} />
  <Route path="/tools" element={<Tools />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/terms" element={<Terms />} />
  <Route path="/admin" element={<Admin />} />

  {/* Tool Pages - Pattern: /tools/[tool-name] */}
  <Route path="/tools/image-compressor" element={<ImageCompressor />} />
  <Route path="/tools/qr-generator" element={<QRGenerator />} />
  {/* ... 40+ tool routes */}

  {/* 404 Fallback */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## ➕ How to Add a New Tool

### Step 1: Create the Tool Page

Create a new file in `src/pages/tools/`:

```tsx
// src/pages/tools/MyNewTool.tsx
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';

const MyNewTool = () => {
  return (
    <ToolPageLayout
      title="My New Tool AI"
      description="A helpful tool that does X, Y, Z"
      article="Detailed article about the tool for SEO..."
      keywords="tool, keyword1, keyword2"
    >
      {/* Your tool UI here */}
    </ToolPageLayout>
  );
};

export default MyNewTool;
```

### Step 2: Add Route in App.tsx

```tsx
import MyNewTool from './pages/tools/MyNewTool';

// Inside Routes:
<Route path="/tools/my-new-tool" element={<MyNewTool />} />
```

### Step 3: Add to ToolsGrid

In `src/components/home/ToolsGrid.tsx`, add to `allTools` array:

```tsx
{
  id: 'my-new-tool',
  nameKey: 'tools.myNewTool.name',
  descriptionKey: 'tools.myNewTool.description',
  category: 'image', // or 'pdf', 'text', 'color', 'calculator', 'qr', 'seo'
  href: '/tools/my-new-tool',
}
```

### Step 4: Add Translations

In `src/lib/i18n/translations.ts`, add for each language:

```tsx
myNewTool: {
  name: 'My New Tool AI',
  description: 'Description of what it does',
}
```

---

## ➕ How to Add a New Category

### Step 1: Update Translations

In `src/lib/i18n/translations.ts`:

```tsx
categories: {
  // ... existing
  newCategory: 'New Category',
}
```

### Step 2: Update CategoryFilter

In `src/components/home/CategoryFilter.tsx`:

```tsx
import { NewIcon } from 'lucide-react';

const categories = [
  // ... existing
  { id: 'newCategory', icon: NewIcon, labelKey: 'categories.newCategory' },
];
```

### Step 3: Update Index Page

In `src/pages/Index.tsx`, add to categories array:

```tsx
{
  id: 'newCategory',
  name: t.categories.newCategory,
  icon: NewIcon,
  colorClass: 'category-card-newcolor',
  textColor: 'text-[hsl(xxx,xx%,xx%)]',
  darkTextColor: 'dark:text-[hsl(xxx,xx%,xx%)]'
}
```

### Step 4: Update ToolCard Types

In `src/components/home/ToolCard.tsx`:

```tsx
category: 'image' | 'pdf' | 'text' | 'color' | 'calculator' | 'qr' | 'seo' | 'newCategory';
```

---

## 🌍 Internationalization (i18n)

The app supports **English**, **Arabic**, and **French**.

- Translations are in `src/lib/i18n/translations.ts`
- Language context is provided by `src/lib/i18n/LanguageContext.tsx`
- RTL support is automatic for Arabic

Usage:
```tsx
const { t, isRTL, language, setLanguage } = useLanguage();
```

---

## 🔐 Environment Variables

These are auto-managed by Lovable Cloud:

```env
VITE_SUPABASE_URL=<auto>
VITE_SUPABASE_PUBLISHABLE_KEY=<auto>
VITE_SUPABASE_PROJECT_ID=<auto>
```

**Do NOT edit `.env` manually.**

---

## 📦 Deployment

### Vercel
- `vercel.json` handles SPA routing with rewrites
- Push to main branch auto-deploys

### Netlify
- `netlify.toml` configures redirects
- Push to main branch auto-deploys

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

Use semantic classes, not raw colors:
- ✅ `bg-background`, `text-foreground`, `border-border`
- ❌ `bg-white`, `text-black`

---

## 🔍 SEO Features

- **JSON-LD Schema** on every tool page (WebApplication + BreadcrumbList)
- **Open Graph & Twitter Cards** for social sharing
- **Canonical URLs** to prevent duplicates
- **robots.txt** with AI crawler support (GPTBot, CCBot, PerplexityBot)
- **sitemap.xml** for search engine indexing
- **PWA manifest** for mobile installation

---

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📝 Admin Dashboard

Access: `/admin`
Authentication: **Password-only login** (no email required)

### Security Features (February 2026)
- Password stored as **Base64-encoded** string (obfuscated, not plain text)
- Password hashed using **SHA-256** before comparison
- **Constant-time comparison** to prevent timing attacks
- Session stored in **sessionStorage** with 24-hour expiry
- No email or Supabase Auth required - simple password verification

### Dashboard Features:
- **Site identity management** (logo, name)
- **Content editing** (Hero, About, Contact)
- **SEO metadata configuration**
- **Advanced Ad Management**:
  - Google AdSense with enable/disable toggle
  - Adsterra Top & Sidebar with individual toggles
  - Custom ad slots (Header, Sidebar, Footer, In-Content) with enable/disable
- **Analytics overview** - Real-time stats with quick action buttons
- **Theme settings** with dark/light mode
- **Quick Actions** - Fast access to common tasks

---

## 🤝 Contributing

1. Create a feature branch
2. Follow existing patterns for new tools
3. Ensure translations are added for all 3 languages
4. Test on mobile and desktop
5. Submit PR with clear description

---

## 📄 License

This project is proprietary. All rights reserved.

---

**Built with ❤️ using Lovable**
