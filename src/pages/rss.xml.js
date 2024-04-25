import rss from '@astrojs/rss';
import { getPosts } from '../utils/blog';

export async function GET(context) {
  const posts = await getPosts("posts");
  return rss({
    title: 'Krayorn | Blog',
    description: 'A blog containing my thoughts and reflections on AI, Software, Board Games and whatever else finds it\'s way in my mind.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}