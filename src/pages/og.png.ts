import { generateOgImage } from '../utils/og';

export async function GET() {
  return generateOgImage(
    "Krayorn's Blog",
    "A blog containing my thoughts and reflections on AI, Software, Board Games and whatever else finds it's way in my mind.",
  );
}
