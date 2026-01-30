import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { multiplication } from '$lib/server/db/schema';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const cookie = cookies.get('user');
  if (!cookie) {
    return json({ success: false, message: 'Not Authenticated' });
  }

  const data = await request.json();
  const user = JSON.parse(cookie);

  await db.insert(multiplication).values({
    userId: user.id,
    sequence: data.multiplication,
    questions: data.questions,
    correct: data.correct,
    time: data.time
  });

  return json({ success: true, message: 'Successfully Posted Multiplication Score' });
};
