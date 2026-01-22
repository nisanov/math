import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { LoginSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { setFlash } from 'sveltekit-flash-message/server';

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await superValidate(request, valibot(LoginSchema));
    if (!form.valid) {
      return fail(422, { form });
    }

    let authedUser = await db.query.user.findFirst({
      where: eq(user.username, form.data.username)
    });

    if (!authedUser) {
      const [created] = await db.insert(user).values({ username: form.data.username }).returning();
      authedUser = created;
    }

    cookies.set('user', JSON.stringify(authedUser), { path: '/', sameSite: 'strict' });

    setFlash(
      { type: 'success', content: `Successfully logged you in, ${authedUser.username}.` },
      cookies
    );
  },
  logout: async ({ cookies }) => {
    const authedUser = JSON.parse(<string>cookies.get('user'));

    await db
      .update(user)
      .set({
        updatedAt: new Date()
      })
      .where(eq(user.id, authedUser.id));

    cookies.delete('user', { path: '/', sameSite: 'strict' });

    setFlash(
      { type: 'warning', content: `Successfully logged you out, ${authedUser.username}.` },
      cookies
    );
  }
} satisfies Actions;
