import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://krayorn.com/",
  integrations: [preact(), sitemap()],
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://krayorn.com/posts/2-draft/',
    })
  ],
});