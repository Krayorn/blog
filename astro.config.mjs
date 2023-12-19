import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.krayorn.com/",
  integrations: [preact(), sitemap()],
  integrations: [
    sitemap({
      filter: (page) => !page.includes('draft'),
    })
  ],
});