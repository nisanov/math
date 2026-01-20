import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { AuthSchema } from '$lib/schemas';

export const load: PageServerLoad = async () => {
  const form = {
    authentication: await superValidate(valibot(AuthSchema))
  };

  return {
    title: 'Mathematics Practice',
    form
  };
};
