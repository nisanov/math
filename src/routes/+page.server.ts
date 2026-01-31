import type { PageServerLoad } from './$types';
import { CookieService, type User } from '$lib/services/cookies';
import { multiplication } from '$lib/schemas/database/schema';
import { db } from '$lib/schemas/database';
import { and, asc, desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ cookies }) => {
  const cookie: CookieService = new CookieService(cookies);
  const user: User | undefined = cookie.getUser();
  const questions: number = cookie.getQuestions();
  const sequence: number = cookie.getSequence();

  let best = undefined;
  if (user) {
    best = await db
      .select()
      .from(multiplication)
      .where(
        and(
          eq(multiplication.userId, user.id),
          eq(multiplication.questions, questions),
          eq(multiplication.sequence, sequence)
        )
      )
      .orderBy(desc(multiplication.correct), asc(multiplication.time))
      .limit(1);

    best = best[0];
  }

  return {
    title: 'Mathematics Practice',
    sequence,
    questions,
    best
  };
};
