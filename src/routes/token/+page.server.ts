import { fail } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { AuthSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export const actions = {
  authenticate: async ({ request }) => {
    const form = await superValidate(request, valibot(AuthSchema));
    if (!form.valid) {
      return fail(422, { form });
    }

    // get a user from the database
    // create a user if the user does not exist
    // return the user's authentication token if it is valid
    // generate a new authentication token if one does not exist

    return message(form, 'Successfully Generated Authentication Token');
  },
  revoke: async (event) => {
    console.log(event);
  }
} satisfies Actions;
