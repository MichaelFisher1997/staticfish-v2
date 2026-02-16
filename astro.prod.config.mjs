// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sanity from '@sanity/astro';

// This is the production-specific configuration.
// It includes the .edge alias needed for Cloudflare deployment.
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [
    react(),
    tailwind(),
    sanity({
      projectId: '2gr3dh6t',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/studio',
    }),
  ],
  vite: {
    ssr: {
      external: ['node:buffer'],
    },
    resolve: {
      // This alias is ONLY for production builds on Cloudflare.
      alias: { 'react-dom/server': 'react-dom/server.edge' },
    },
  },
});
