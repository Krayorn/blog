import { generateOgImage } from '../../utils/og';

export async function GET() {
  return generateOgImage('Projects', 'A list of all my projects, past and present.');
}
