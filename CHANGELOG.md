# Changelog

All notable changes to **BestToolsHub** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.5.0] - 2026-01-06

### 🔒 Security Updates

#### XSS Protection for Ad Code (`src/lib/adCodeValidator.ts`)
- **Inline Script Blocking**: All inline scripts are now blocked - only external scripts from trusted domains allowed
- **Trusted Domain Whitelist**: Added validation for Google AdSense, Adsterra, Media.net, and other verified ad networks
- **Forbidden Tags**: Blocks dangerous HTML tags including `<iframe>`, `<object>`, `<embed>`, `<form>`, `<input>`, `<svg>`, `<link>`, `<meta>`, `<base>`
- **Dangerous Protocols**: Blocks `javascript:`, `data:`, `vbscript:`, `file:`, `ftp:`, `blob:` protocols
- **Event Handler Blocking**: Blocks 100+ event handlers (`onclick`, `onerror`, `onload`, etc.)
- **DOMPurify Sanitization**: Additional layer of HTML sanitization

#### Google Analytics Security (`src/lib/siteConfig.ts`)
- **GA ID Validation**: Regex validation for G-XXXXXXXXXX, UA-XXXXXXXX-X, AW-XXXXXXXXXX formats
- **URL Encoding**: Uses `encodeURIComponent()` for GA ID in script URL
- **Safe Script Injection**: Uses `textContent` instead of `innerHTML` for inline configuration

#### Website Speed Test Protection (`src/pages/tools/WebsiteSpeedTest.tsx`)
- **Rate Limiting**: Maximum 1 request per minute using localStorage timestamp
- **SSRF Protection**: Blocks private IP addresses and internal hostnames:
  - `localhost`, `127.x.x.x`, `192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`
  - IPv6 localhost (`::1`, `[::1]`)
  - IPv6 private ranges (`fc00::/7`, `fe80::/10`)
  - `.local` domains
- **Cooldown Display**: Shows remaining seconds before next request allowed

#### Secure Authentication System
- **Separate Roles Table**: `user_roles` table isolated from `profiles` (prevents privilege escalation)
- **RLS Policies**: Row Level Security on all sensitive tables
- **SECURITY DEFINER Functions**: `has_role()` function prevents RLS recursion
- **Server-side Validation**: No client-side admin checks (localStorage/hardcoded)

---

## [2.4.0] - 2026-01-05

### ✨ New Features

#### QR Code Generator Enhancements
- Added **130+ QR Code Templates** organized by categories
- Added **Gold ✨ Premium Templates** (15 exclusive designs)
- Added **3D Artistic Templates** (50+ 3D-style designs)
- Added **Social Media Quick Links** (Instagram, WhatsApp, TikTok, etc.)
- Added **Dynamic Logo Resizing** (10-50% via slider)
- Added **11+ Content Types**: URL, Text, Email, Phone, WiFi, vCard, SMS, Location, Event, WhatsApp, Crypto
- Added **Cryptocurrency QR Support** (Bitcoin, Ethereum, Litecoin, Dogecoin, Solana, BNB, XRP, USDT)
- Fixed **Arabic/English Number Input** handling
- Added **Emoji Support** (UTF-8) in text fields

#### Admin Dashboard
- **New Professional Sidebar Layout** with responsive design
- **Supabase Auth Integration** for secure authentication
- **First Admin Setup Flow** for initial configuration
- **Quick Action Buttons** (Add SEO Tool, View Analytics)
- **RTL Optimization** for Arabic interface
- **Direct Logo Upload** with immediate site-wide application

### 🎨 Design Improvements

#### Homepage Redesign
- **Dense Category Blocks** layout (grid-cols-2 to grid-cols-6)
- **SEO Category** with Search icon for SEO tools
- **Color-coded Category Cards** for visual differentiation
- **Improved Mobile Responsiveness**

#### Dynamic Header Behavior
- **Smart Hide/Show**: Header hides on scroll down, reappears on scroll up
- **Mobile Optimization**: Maximizes content space on mobile devices

---

## [2.3.0] - 2026-01-03

### 🔧 Performance Optimizations

#### Delayed Ad Loading
- **5-Second Delay** or trigger on first user scroll
- **Adsterra & DynamicAdSlot** scripts initialize after delay
- **Fixed-Height Placeholders** to prevent CLS (Cumulative Layout Shift)
- **90+ Google PageSpeed Score** target achieved

#### Font & Asset Optimization
- **font-display: swap** for all global fonts
- **Lazy Loading** for tool icons
- **CSS Hardware Acceleration** for festive effects

---

## [2.2.0] - 2025-12-28

### 🎄 Seasonal Features

#### Christmas Mode
- **Festive Theme Toggle** in Admin panel
- **Snowfall Animation** with CSS hardware acceleration
- **Holiday Color Scheme** option
- **New Year 2026 Banner** preparation

---

## [2.1.0] - 2025-12-20

### 📱 Mobile & Accessibility

#### Full Mobile Compatibility
- All tools optimized for **mobile, tablet, and desktop**
- **Touch-friendly Interactions**
- **Responsive Sidebar** for Admin dashboard
- **RTL Support** for Arabic language

---

## [2.0.0] - 2025-12-01

### 🚀 Major Release - Complete Rebuild

#### New Technology Stack
- **React 18.3.1** with Vite
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Supabase** for backend (authentication, database)
- **Shadcn/UI** component library

#### Tool Categories
- **Image Tools**: Converter, Compressor, Resizer, Cropper, ToBase64
- **PDF Tools**: Merge, Split, Compress, ToImage, ImageToPDF, ToWord, ToPowerPoint, ToExcel, ToHTML, Rotate, Sign, Watermark, Protect, PageNumbers
- **Document Converters**: PowerPoint/Word/Excel to PDF
- **Text Tools**: Counter, Formatter, Diff, Lorem Generator, Slug Generator
- **Color Tools**: Picker, Palette, Converter, Contrast Checker, Gradient Generator
- **Calculators**: Age, BMI, Percentage, Unit, Tip
- **QR Tools**: Generator with 130+ templates, Scanner
- **SEO Tools**: Website Speed Test, Broken Links Checker, Meta Tag Generator, Keyword Density, Robots.txt Generator, XML Sitemap Generator, Open Graph Preview

#### Monetization System
- **Dynamic Ad Slots** (Header, Sidebar, Footer, In-Content)
- **Admin-Configurable** ad codes
- **Multi-Provider Support** (AdSense, Adsterra, Media.net)
- **Safe Ad Rendering** with validation

#### SEO & Discoverability
- **Schema Markup** for tools
- **AI-Crawler Friendly** robots.txt
- **Sitemap** generation
- **Open Graph** meta tags
- **Vercel Speed Insights** integration

---

## [1.0.0] - 2025-10-01

### 🎉 Initial Release

- Basic tools website structure
- Simple tool implementations
- Static content management

---

## Security Checklist

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

---

## Contributors

- **Development Team**: BestToolsHub
- **Security Review**: January 2026

---

## License

This project is proprietary. All rights reserved.
