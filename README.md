# SweetJamz

<!-- add screenshots here -->

A small coffee-and-pastry shop ordering app — browse the menu, order ahead, and earn rewards
points toward discounts or a free item. Built as a portfolio project to practice a decoupled
SPA + API architecture with token-based multi-guard auth.

**Live demo:** https://sweetjamz-web.vercel.app
**API:** https://sweetjamz-api.onrender.com

### Demo credentials

| Role | Email | Password |
| --- | --- | --- |
| Customer | `jane@example.com` | `password123` |
| Staff (admin) | `owner@sweetjamz.com` | `password123` |

## What's here

- Public menu, filterable by category, with a cart and checkout flow
- Customer accounts: signup/login, order history, rewards balance + redemption at checkout
- Staff portal: order queue (advance/cancel orders), product management with image upload
- Password reset flow for both customer and staff accounts

## Architecture

This repo is the frontend only — a separate Laravel API (`sweetjamz-api`) handles all data and
business logic. The two are fully decoupled: this app is a static SPA that talks to the API over
HTTPS and holds no server-side state of its own.

- **Auth**: Laravel Sanctum, token-based (not cookie/session SPA auth). Login returns a bearer
  token that's attached manually to every authenticated request. Customer and employee are two
  entirely separate identities/guards on the backend — kept as two independent slices of state
  here, never conflated. The token is held only in React state (`AuthContext`), not
  `localStorage` — a hard refresh logs you out, which is an intentional trade-off to reduce XSS
  exposure.
- **Cart**: client-side only (`CartContext`), no backend calls until checkout. The displayed
  total is for convenience — the real total is always recalculated server-side.
- **API client**: one centralized `fetch` wrapper (`src/api/client.js`) that attaches the
  `Authorization` header automatically and handles both JSON and multipart (file upload) bodies.

## Stack

- React 19 + Vite
- React Router
- Plain CSS (custom design system in `src/index.css`, no framework)
- Deployed on Vercel

## Local setup

```sh
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your local API, e.g. http://127.0.0.1:8000/api
npm run dev
```

You'll need the [sweetjamz-api](../sweetjamz-api) backend running locally (or pointed at a
deployed instance) for the app to have any data to show.

```sh
npm run build      # production build
npm run preview    # preview the production build locally
```
