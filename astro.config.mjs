import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://www.krayorn.com/",
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('draft'),
    }),
    mdx(),
    react(),
  ],
});