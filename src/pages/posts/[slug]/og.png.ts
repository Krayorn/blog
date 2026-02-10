import { generateOgImageWithCover } from '../../../utils/og';
import { getPosts } from '../../../utils/blog';

interface Props {
  params: { slug: string };
  props: { post };
}

export async function GET({ props }: Props) {
  const { post } = props;
  return generateOgImageWithCover(
    post.data.title,
    post.data.cover ?? 'public/og/default.png',
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
