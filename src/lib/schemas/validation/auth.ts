import * as v from 'valibot';

export const LoginSchema = v.object({
  username: v.pipe(
    v.string(),
    v.nonEmpty('Username is required'),
    v.minLength(3, 'Username must be at least 3 characters')
  )
});

export const LogoutSchema = v.object({});
