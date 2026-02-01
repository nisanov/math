import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { CookieService } from '$lib/services/cookies';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json();

  new CookieService(cookies).isDarkMode(data.dark);

  return json({
    success: true,
    message: 'Successfully Updated Theme Setting'
  });
};
