import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { CookieService } from '$lib/services/cookies';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json();

  new CookieService(cookies).setQuestions(data.questions);

  return json({
    success: true
  });
};
