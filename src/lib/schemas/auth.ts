import * as v from 'valibot';

export const AuthSchema = v.object({
  username: v.pipe(
    v.string(),
    v.nonEmpty('Username is required'),
    v.minLength(3, 'Username must be at least 3 characters')
  )
});

export type LoginInput = v.InferInput<typeof AuthSchema>;
