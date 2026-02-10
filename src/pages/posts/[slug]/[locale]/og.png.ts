import { generateOgImageWithCover } from '../../../../utils/og';
import { getTranslatedPosts } from '../../../../utils/blog';

interface Props {
  params: { slug: string };
  props: { post };
}

export async function GET({ props }: Props) {
  const { post } = props;
  return generateOgImageWithCover(
    post.data.title,
    post.data.cover ?? 'public/og/default.jpeg',
  );
}

export async function getStaticPaths() {
  const posts = await getTranslatedPosts();
  return posts.map((post) => ({
    params: { slug: post.slug, locale: 'fr' },
    props: { post },
  }));
}
