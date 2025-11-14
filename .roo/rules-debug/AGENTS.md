# Debug Mode Rules (Non-Obvious Only)

- Dev server runs on port 5050 with `bun dev` - check output for actual URL
- Production builds must use `astro.prod.config.mjs` or Cloudflare deployment fails with `react-dom/server` errors
- Sanity client in `src/lib/sanity.ts` has `useCdn: false` - API requests may be slower but always fresh
- CSP nonce generation in `src/middleware.ts` can cause CSP violations if modified incorrectly
- Docker uses `oven/bun:latest` not node:alpine - different package manager
- Environment variables support dual naming: both `PUBLIC_SANITY_*` and `SANITY_*` formats work