# Enfono Website v2 — Project Guide

## Overview
Marketing website for Enfono Technologies (enfono.com). React CRA SPA with SCSS styling, fetching CMS content from Frappe v15 backend.

## Related Repos
- **This repo**: `sayanthns/enfono-website-v2` (branch: `main`) — Frontend
- **Frappe backend**: `sayanthns/fateh_website` (branch: `master`) — Shared backend app
- **Fateh frontend**: `sayanthns/Fatheherp-website` — Sister site (fateherp.com)

## Tech Stack
- React 18 + JavaScript + Create React App
- SCSS + React Bootstrap
- Framer Motion (animations)
- React Router v6
- CountUp.js (stat counters)

## Backend API
- **Base URL**: `https://office.enfonoerp.com`
- **API module**: `fateh_website.enfono_api`
- **Key endpoints**:
  - `GET /api/method/fateh_website.enfono_api.get_all_content` — All CMS content
  - `POST /api/method/fateh_website.enfono_api.submit_lead` — Contact form
  - `POST /api/method/fateh_website.enfono_api.chat` — AI chatbot
  - `GET /api/method/fateh_website.enfono_api.get_blog_posts` — Blog posts
  - `GET /api/method/fateh_website.enfono_api.get_case_studies` — Case studies

## Key Pages
- `/` — Home (EnfonoHome.jsx)
- `/services` — Services listing
- `/ai-erp` — AI ERP page
- `/case-studies` — Case studies
- `/careers` — Careers
- `/about` — About us
- `/contact` — Contact form
- `/brands` — Product brands

## Project Structure
```
src/
├── Pages/
│   ├── Home/EnfonoHome.jsx          # Main homepage (hero, industries, services, etc.)
│   ├── Services/                     # Services pages
│   ├── About/                        # About page
│   └── ...
├── Components/
│   ├── EnfonoUI/
│   │   ├── EnfonoHeader.jsx          # Site header/nav
│   │   └── EnfonoFooter.jsx          # Site footer
│   └── ...
├── Assets/
│   └── scss/pages/_enfono.scss       # Main stylesheet (5000+ lines)
├── Context/Context.js                # React context for CMS data
├── Data/cms_data.js                  # Default/fallback CMS data
└── Functions/useWindowSize.js        # Responsive hook (isMobile, isDesktop, isSmall)
```

## Styling
- Main SCSS file: `src/Assets/scss/pages/_enfono.scss`
- Uses BEM-like naming: `.enfono-hero-new`, `.e-industry-card`, `.e-service-card`
- Responsive breakpoints: 991px (tablet), 767px (mobile), 575px (small mobile), 480px, 380px
- Color scheme: Dark (#020617) + Green (#10B981, #34D399, #7BBB9B)
- Light mode override class: `.enfono-light-mode`

## Deployment
```bash
# Build
npm run build

# Deploy to VPS
sshpass -p 'enfono123' scp -r build/* root@156.67.105.6:/var/www/enfono/
```

## Server
- **VPS IP**: 156.67.105.6
- **SSH**: `root` / `enfono123`
- **Document root**: `/var/www/enfono/`
- **Web server**: Caddy (with SPA fallback)
- **Caddyfile**: `/etc/caddy/Caddyfile`

## Google Analytics
- GA4 Measurement ID: `G-8S8NFD5X80`
- Tag in `public/index.html`
- Data synced to Frappe daily via backend scheduler

## CMS Data Flow
1. Admin edits content in Frappe doctypes (office.enfonoerp.com)
2. Frontend calls `get_all_content` API on load
3. Data cached in `localStorage` as `enfono_cms_data`
4. Fallback to `initialCmsData` from `Data/cms_data.js` if API fails
5. Cross-tab sync via `storage` event listener
