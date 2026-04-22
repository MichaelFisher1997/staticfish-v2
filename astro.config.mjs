// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

// Dev config (no Cloudflare adapter - workerd binds to 127.0.0.1 which breaks Docker networking)
// Production builds use astro.prod.config.mjs with the Cloudflare adapter
export default defineConfig({
  output: 'server',
  integrations: [
    react(),
    sanity({
      projectId: '2gr3dh6t',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/studio',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:buffer'],
    },
    server: {
      host: '0.0.0.0',
      port: 5050,
      allowedHosts: ['staticfish-2.silverside-gopher.ts.net'],
    },
  },
});
