import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { CookieService } from '$lib/services/cookies';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json();

  new CookieService(cookies).setSequence(data.sequence);

  return json({
    success: true
  });
};
