// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
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
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 5050
  }
});