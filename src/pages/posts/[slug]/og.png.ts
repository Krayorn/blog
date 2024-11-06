import { ImageResponse } from '@vercel/og';
import { getPosts } from '../../../utils/blog';
import fs from 'fs';
import path from 'path';

interface Props {
  params: { slug: string };
  props: { post };
}
 
export async function GET({ props }: Props) {
  const { post } = props;
 
  const DmSansBold = fs.readFileSync(path.resolve('public/DMSans-Bold.ttf'));
  const DmSansReqular = fs.readFileSync(
    path.resolve('public/DMSans-Regular.ttf'),
  );

  const postCover = fs.readFileSync(path.resolve(post.data.cover ? post.data.cover : 'public/og/default.png'));

  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            // using tailwind
            tw: 'w-[500px] h-[500px] flex rounded-3xl overflow-hidden',
            children: [
              {
                type: 'img',
                props: {
                  src: postCover.buffer,
                },
              },
            ],
          },
        },
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
                    fontFamily: 'DM Sans Bold',
                    color: '#21c382',
                  },
                  children: post.data.title,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[40px] bottom-[40px] flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-blue-600 text-3xl',
                  style: {
                    fontFamily: 'DM Sans Bold',
                  },
                  children: 'Krayorn | Blog',
                },
              },
            ],
          },
        },
      ],
      tw: 'w-full h-full flex items-center justify-center relative px-22',
      style: {
        background: 'black',
        fontFamily: 'DM Sans Regular',
      },
    },
  };
 
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: 'DM Sans Bold',
        data: DmSansBold.buffer,
        style: 'normal',
      },
      {
        name: 'DM Sans Regular',
        data: DmSansReqular.buffer,
        style: 'normal',
      },
    ],
  });
}
 
 
// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}