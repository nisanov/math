import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { LoginSchema, LogoutSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

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

    return message(form, {
      type: 'success',
      content: 'Successfully Logged In'
    });
  },
  logout: async ({ cookies }) => {
    const form = await superValidate(valibot(LogoutSchema));
    const userCookie = cookies.get('user');

    if (userCookie) {
      const authedUser = JSON.parse(userCookie);

      await db
        .update(user)
        .set({
          updatedAt: new Date()
        })
        .where(eq(user.id, authedUser.id));
    }

    cookies.delete('user', { path: '/', sameSite: 'strict' });

    return message(form, {
      type: 'warning',
      content: 'Successfully Logged Out'
    });
  }
} satisfies Actions;
