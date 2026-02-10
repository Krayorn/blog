import { generateOgImage } from '../../utils/og';

export async function GET() {
  return generateOgImage('Tag Index', "Page listing all tags present in Krayorn's blog.");
}
