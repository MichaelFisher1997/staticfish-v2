# Architect Mode Rules (Non-Obvious Only)

- Dual Sanity configuration: CMS config uses `2gr3dh6t` while Astro integration uses `z29mwf2i` (intentional separation)
- Server-side rendering with Cloudflare adapter - all API routes must be edge-compatible
- CSP security via `src/middleware.ts` with runtime nonce generation - must preserve for Cloudflare Pages
- Component architecture: UI components use CVA patterns in `src/components/ui/` - consistent variant system
- Nordic dark theme system: HSL values in `src/styles/global.css` are tightly coupled - changing breaks design consistency
- Production builds require `astro.prod.config.mjs` for `react-dom/server.edge` alias - deployment fails without it
- Sanity client configuration in `src/lib/sanity.ts` with specific API version `2023-05-03` and `useCdn: false`