// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

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
