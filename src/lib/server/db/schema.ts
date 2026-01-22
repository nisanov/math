import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar().notNull(),
  createdAt: timestamp({ precision: 6, withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ precision: 6, withTimezone: true }).defaultNow().notNull()
});
