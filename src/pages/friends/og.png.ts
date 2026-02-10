import { generateOgImage } from '../../utils/og';

export async function GET() {
  return generateOgImage('My Friends', 'A webring of blogs from my friends and I.');
}
