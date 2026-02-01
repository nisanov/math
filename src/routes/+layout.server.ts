import { loadFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { LoginSchema, LogoutSchema } from '$lib/schemas/validation';
import type { LayoutServerLoad } from './$types';
import { CookieService } from '$lib/services/cookies';

export const load: LayoutServerLoad = loadFlash(async ({ cookies }) => {
  const cookie = new CookieService(cookies);
  return {
    user: cookie.getUser(),
    dark: cookie.isDarkMode(),
    form: {
      login: await superValidate(valibot(LoginSchema)),
      logout: await superValidate(valibot(LogoutSchema))
    }
  };
});
