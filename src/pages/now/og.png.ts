import { generateOgImage } from '../../utils/og';

export async function GET() {
  return generateOgImage("What I'm doing now");
}
