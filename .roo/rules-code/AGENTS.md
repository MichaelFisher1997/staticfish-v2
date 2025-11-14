# Code Mode Rules (Non-Obvious Only)

- Always use `bun` as package manager (not npm/yarn/pnpm)
- Production builds MUST use `astro.prod.config.mjs` - regular config lacks `react-dom/server.edge` alias
- UI components use Class Variance Authority (CVA) - check `src/components/ui/` for examples
- CSP headers in `src/middleware.ts` are critical for deployment - don't modify without understanding Cloudflare Pages requirements
- Nordic dark theme colors in `src/styles/global.css` use specific HSL values - don't override without understanding design system
- Static content system uses `src/lib/static-data.ts` for blog posts and categories