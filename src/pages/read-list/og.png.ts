import { generateOgImage } from '../../utils/og';

export async function GET() {
  return generateOgImage(
    'Read List',
    'A list of links to various interesting ressources I wished to share on the internet !',
  );
}
