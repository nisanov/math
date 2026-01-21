import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { AuthSchema, RevokeSchema } from '$lib/schemas';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  return {
    user: cookies.get('user') ? JSON.parse(cookies.get('user') || '{}') : undefined,
    form: {
      authentication: await superValidate(valibot(AuthSchema)),
      revoke: await superValidate(valibot(RevokeSchema))
    }
  };
};
