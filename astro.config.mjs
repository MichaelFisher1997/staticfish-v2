// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
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
      allowedHosts: ['staticfish-1.silverside-gopher.ts.net'],
    },
  },
});