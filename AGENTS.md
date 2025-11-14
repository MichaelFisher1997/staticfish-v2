# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build Commands (Critical)
- Development: `bun dev` (uses Cloudflare dev server on port 5050)
- Production build: `bun build` (requires `astro.prod.config.mjs`, NOT regular astro.config.mjs)
- Preview: `bun preview`
- Use `astro.prod.config.mjs` for production builds only - contains `react-dom/server.edge` alias

## Environment Variables (Dual Support)
- Sanity supports both `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` and `SANITY_PROJECT_ID`/`SANITY_DATASET` fallbacks
- Must set either public or private vars for Sanity to work

## Sanity Configuration (Critical Gotcha)
- `sanity.config.js`: projectId `2gr3dh6t`, dataset `production`
- `astro.config.mjs`: projectId `z29mwf2i`, dataset `production` (DIFFERENT PROJECT ID)
- Client in `src/lib/sanity.ts` uses API version `2023-05-03` and `useCdn: false`

## Security & Middleware
- CSP headers injected via `src/middleware.ts` with runtime nonce generation
- Strict security headers including CSP, HSTS, X-Frame-Options

## Linting & TypeScript
- Uses `oxlint` (not ESLint), available in dependencies
- TypeScript uses Astro strict config with `jsx: "react-jsx"` and `jsxImportSource: "react"`

## Component Patterns
- UI components use Class Variance Authority (CVA) for variants
- `src/lib/utils.ts` provides `cn()` utility combining `clsx` + `tailwind-merge`
- Nordic dark theme with HSL color tokens defined in `src/styles/global.css`

## Database Integration
- Sanity queries in `src/lib/sanity.ts` follow specific patterns
- Client has `useCdn: false` for API requests (fetches fresh data)

## Docker Configuration
- Uses `oven/bun:latest` image (NOT node:alpine)
- Exposes port 5050, runs with `HOST=0.0.0.0`
- Dev server runs via `bun run dev -- --host --port 5050`