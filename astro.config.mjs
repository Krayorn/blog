import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://www.krayorn.com/",
  trailingSlash: 'always',
  integrations: [sitemap(), mdx(), react(), tailwind()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  redirects: {
    '/posts/bouties-on-goals/': '/posts/bounties-on-goals/',
  }
});