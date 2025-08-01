import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './src/schemas';

export default defineConfig({
  name: 'default',
  title: 'StaticFish CMS',
  
  projectId: '2gr3dh6t',
  dataset: 'production',
  
  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
