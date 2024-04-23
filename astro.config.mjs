import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://www.krayorn.com/",
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: page => !page.includes('draft')
  }), mdx(), react(), tailwind()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  }
});