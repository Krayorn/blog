import { ImageResponse } from '@vercel/og';
import { Astro } from 'Astro';


interface Props {
  params: { slug: string };
  props: { post };
}
 
export async function GET({ props }: Props) {
  const { post } = props;
 
 
  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            tw: 'pl-10 shrink flex',
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '48px',
                  },
                  children: post.data.title,
                },
              },
            ],
          },
        }
      ],
      tw: 'w-full h-full flex items-center justify-center relative px-22',
      style: {
        background: '#f7f8e8',
      },
    },
  };
 
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
  });
}
 
// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const postImportResult = import.meta.glob('../../../pages/posts/**/*.{md,mdx}', { eager: true });
  const posts = Object.values(postImportResult);
  
  return posts.map((post) => ({
    params: { slug: post.url },
    props: { post },
  }));
}