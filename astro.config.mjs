// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    tailwind(),
    react(),
    sanity({
      projectId: process.env.SANITY_PROJECT_ID || '2gr3dh6t',
      dataset: process.env.SANITY_DATASET || 'production',
      useCdn: false,
      studioBasePath: '/studio'
    })
  ],
  server: {
    port: 5050
  },
  vite: {
    ssr: {
      external: ['node:buffer']
    },
    resolve: {
      alias: {
        "react-dom/server": "react-dom/server.edge",
      },
    }
  }
});