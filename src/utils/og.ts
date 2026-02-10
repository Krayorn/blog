import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';

const DmSansBold = fs.readFileSync(path.resolve('public/DMSans-Bold.ttf'));
const DmSansRegular = fs.readFileSync(path.resolve('public/DMSans-Regular.ttf'));

const fonts = [
  { name: 'DM Sans Bold', data: DmSansBold.buffer, style: 'normal' as const },
  { name: 'DM Sans Regular', data: DmSansRegular.buffer, style: 'normal' as const },
];

function branding() {
  return {
    type: 'div',
    props: {
      tw: 'absolute right-[40px] bottom-[40px] flex items-center',
      children: [
        {
          type: 'div',
          props: {
            tw: 'text-3xl',
            style: { fontFamily: 'DM Sans Bold', color: '#ffffff99' },
            children: 'krayorn.com',
          },
        },
      ],
    },
  };
}

function accentBar() {
  return {
    type: 'div',
    props: {
      tw: 'absolute top-0 left-0 w-full h-[6px]',
      style: {
        background: 'linear-gradient(90deg, #21c382, #07f0ff, #21c382)',
      },
    },
  };
}

function bottomLine() {
  return {
    type: 'div',
    props: {
      tw: 'absolute bottom-0 left-0 w-full h-[2px]',
      style: {
        background: 'linear-gradient(90deg, transparent, #21c38240, transparent)',
      },
    },
  };
}

function decorativeCorner() {
  return {
    type: 'div',
    props: {
      tw: 'absolute left-[40px] bottom-[40px] flex items-center',
      children: [
        {
          type: 'div',
          props: {
            tw: 'flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'w-[40px] h-[2px] mr-3',
                  style: { background: '#21c382' },
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'w-[8px] h-[8px] rounded-full',
                  style: { background: '#21c382' },
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export function generateOgImage(title: string, description?: string) {
  const children: object[] = [
    {
      type: 'div',
      props: {
        style: { fontSize: '60px', fontFamily: 'DM Sans Bold', color: '#21c382', lineHeight: '1.1' },
        children: title,
      },
    },
  ];

  if (description) {
    children.push({
      type: 'div',
      props: {
        style: { fontSize: '26px', fontFamily: 'DM Sans Regular', color: '#ffffffcc', lineHeight: '1.5' },
        tw: 'mt-6',
        children: description,
      },
    });
  }

  const html = {
    type: 'div',
    props: {
      tw: 'w-full h-full flex items-center justify-center relative',
      style: {
        background: 'linear-gradient(135deg, #0a0f0d 0%, #0d1a14 40%, #111a16 100%)',
        fontFamily: 'DM Sans Regular',
      },
      children: [
        accentBar(),
        bottomLine(),
        { type: 'div', props: { tw: 'flex flex-col px-24 w-full', children } },
        decorativeCorner(),
        branding(),
      ],
    },
  };

  return new ImageResponse(html, { width: 1200, height: 600, fonts });
}

export function generateOgImageWithCover(title: string, coverPath: string) {
  const postCover = fs.readFileSync(path.resolve(coverPath));

  const html = {
    type: 'div',
    props: {
      tw: 'w-full h-full flex items-center relative',
      style: {
        background: 'linear-gradient(135deg, #0a0f0d 0%, #0d1a14 40%, #111a16 100%)',
        fontFamily: 'DM Sans Regular',
      },
      children: [
        accentBar(),
        bottomLine(),
        {
          type: 'div',
          props: {
            tw: 'flex items-center px-16 w-full',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'flex rounded-2xl overflow-hidden',
                  style: {
                    width: '280px',
                    height: '280px',
                    boxShadow: '0 0 40px #21c38230',
                    border: '2px solid #21c38240',
                    flexShrink: '0',
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: postCover.buffer,
                        tw: 'w-full h-full',
                        style: { objectFit: 'cover' },
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'pl-12 shrink flex flex-col',
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: '44px', fontFamily: 'DM Sans Bold', color: '#21c382', lineHeight: '1.2' },
                        children: title,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        decorativeCorner(),
        branding(),
      ],
    },
  };

  return new ImageResponse(html, { width: 1200, height: 600, fonts });
}
