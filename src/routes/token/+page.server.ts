import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { AuthSchema, RevokeSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { generateToken } from '$lib/server/auth/jwt';

export const actions = {
  authenticate: async ({ request, cookies }) => {
    const form = await superValidate(request, valibot(AuthSchema));
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

    authedUser.token = await generateToken();

    await db.update(user).set({ token: authedUser.token }).where(eq(user.id, authedUser.id));

    const userCookie = {
      visited: authedUser.createdAt.toString() !== authedUser.updatedAt.toString(),
      ...authedUser
    };

    cookies.set('user', JSON.stringify(userCookie), { path: '/', sameSite: 'strict' });

    return message(form, {
      type: 'success',
      content: 'Successfully Generated Authentication Token'
    });
  },
  revoke: async ({ cookies }) => {
    const form = await superValidate(valibot(RevokeSchema));
    const userCookie = cookies.get('user');

    if (userCookie) {
      const authedUser = JSON.parse(userCookie);

      await db
        .update(user)
        .set({
          token: null,
          updatedAt: new Date()
        })
        .where(eq(user.id, authedUser.id));
    }

    cookies.delete('user', { path: '/', sameSite: 'strict' });

    return message(form, {
      type: 'warning',
      content: 'Successfully Revoked Authentication Token'
    });
  }
} satisfies Actions;
