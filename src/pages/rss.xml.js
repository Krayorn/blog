import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Krayorn | Blog',
    description: 'A blog containing my thoughts and reflections on AI, Software, Board Games and whatever else finds it\'s way in my mind.',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.{md,mdx}')),
    customData: `<language>en-us</language>`,
  });
}