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
  adapter: cloudflare(),
  integrations: [
    react(),
    tailwind(),
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'z29mwf2i',
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2024-06-07',
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
