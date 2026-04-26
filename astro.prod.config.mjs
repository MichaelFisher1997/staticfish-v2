// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

// Production config - static output for Cloudflare Pages
export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    sanity({
      projectId: '2gr3dh6t',
      dataset: 'production',
      useCdn: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:buffer'],
    },
    resolve: {
      alias: { 'react-dom/server': 'react-dom/server.edge' },
    },
  },
});
