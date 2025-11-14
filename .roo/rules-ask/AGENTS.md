# Ask Mode Rules (Non-Obvious Only)

- Sanity CMS project ID mismatch: `sanity.config.js` uses `2gr3dh6t` while `astro.config.mjs` uses `z29mwf2i` 
- Two different Sanity configurations exist - client in `src/lib/sanity.ts` is the primary source
- Nordic dark theme in `src/styles/global.css` uses specific HSL color values - colors cannot be easily changed
- Docker container exposes port 5050 and uses `oven/bun:latest` image
- Package manager is `bun` not npm - scripts in package.json expect bun commands
- Sanity Studio accessible at `/studio` path when deployed