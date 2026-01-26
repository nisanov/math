import { pgTable, uuid, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar().notNull(),
  createdAt: timestamp({ precision: 6, withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ precision: 6, withTimezone: true }).defaultNow().notNull()
});
export const game = pgTable('games', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  sequence: integer().default(10)
});
