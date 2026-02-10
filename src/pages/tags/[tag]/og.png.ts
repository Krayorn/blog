import { generateOgImage } from '../../../utils/og';
import { getPosts, getBattleReports } from '../../../utils/blog';

interface Props {
  params: { tag: string };
}

export async function getStaticPaths() {
  const allPosts = await getPosts();
  const allBattleReports = await getBattleReports();
  const allContent = [...allPosts, ...allBattleReports];
  const uniqueTags = [...new Set(allContent.map((post) => post.data.tags).flat())];
  return uniqueTags.map((tag) => ({
    params: { tag },
  }));
}

export async function GET({ params }: Props) {
  const { tag } = params;
  return generateOgImage(
    `Posts tagged: ${tag}`,
    `A list of all the blogs posts tagged "${tag}" present in Krayorn's blog.`,
  );
}
