# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server (Vite)
npm run build    # Production build → output in build/
npm run serve    # Preview production build
```

No test runner is configured. Linting uses ESLint via `eslint.config.js`.

## Architecture

**Signal, Pixel, Catalog Tester** — a React SPA for testing Meta Pixel (browser-side) and CAPI (server-side Conversions API) integrations.

### Routing & Entry Points

- `index.html` — initializes the FB Pixel SDK with a hardcoded Pixel ID and fires a default PageView
- `src/main.jsx` — wraps the app in `MetaProvider` (global context) and sets up React Router
- Routes: `/` (main tester), `/:id` (same with path segment), `/product/:id` (catalog product), `/microdata`

### Global State

`src/context/PixelContext.jsx` (`MetaProvider`) manages all persistent config via `localStorage`:
- `pixelId`, `testEventCode`, `accessToken`, `catalogLink`, `catalogContent`
- Auto-fetches and parses the catalog CSV whenever `catalogLink` changes

### Event Sending Flow

`src/utils/index.js` contains two key functions:

- **`sendPixel()`** — uses `react-facebook-pixel` to call `fbq("track", eventType, dataParams, {eventID})`
- **`sendCAPI()`** — POSTs to `https://graph.facebook.com/v22.0/{pixelId}/events` with SHA256-hashed PII (email, name, phone, external_id), client IP from ipify, FBP cookie, and optional test event code

All PII is hashed via `js-sha256` before leaving the browser.

### Key Config Files

- `src/config/fbEvents.jsx` — defines the 20+ standard Meta event types and their expected parameters
- `src/config/userInfoJson.jsx` — defines the PII fields (`em`, `fn`, `ln`, `ph`, `external_id`)

### Data Generation

- `src/utils/generateOfflineRecords.jsx` — generates CSV with N faker-generated records for bulk offline event testing
- `src/utils/generateCatalog.jsx` — generates 300+ product catalog records with Google Translate (English → Malay/Filipino)

### Deployment

- GitHub Actions (`deploy.yaml`) builds with Node 18 and deploys to GitHub Pages on push to `master`
- Semgrep SAST runs on push to `main`/`master`/`dev` and daily via `semgrep.yml`
- Jenkins pipeline (`Jenkinsfile`) also runs Semgrep via `semgrep ci`
