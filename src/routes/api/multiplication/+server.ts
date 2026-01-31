import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/schemas/database';
import { multiplication } from '$lib/schemas/database/schema';
import { CookieService } from '$lib/services/cookies';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const user = new CookieService(cookies).getUser();
  if (!user) {
    return json(
      {
        success: false,
        message: 'Not Authenticated'
      },
      {
        status: 401
      }
    );
  }

  const data = await request.json();

  await db.insert(multiplication).values({
    userId: user.id,
    sequence: data.sequence,
    questions: data.questions,
    correct: data.correct,
    time: data.time
  });

  return json({
    success: true,
    message: 'Successfully Posted Multiplication Score'
  });
};
