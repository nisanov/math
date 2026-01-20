import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  return {
    token: cookies.get('token'),
    username: cookies.get('username')
  };
};
