import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar().notNull(),
  token: varchar()
});
