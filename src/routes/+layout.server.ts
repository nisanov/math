import { loadFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { LoginSchema, LogoutSchema } from '$lib/schemas';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = loadFlash(async ({ cookies }) => {
  return {
    user: cookies.get('user') ? JSON.parse(cookies.get('user') || '{}') : undefined,
    form: {
      login: await superValidate(valibot(LoginSchema)),
      logout: await superValidate(valibot(LogoutSchema))
    }
  };
});
