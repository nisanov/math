import { pgTable, uuid, varchar, timestamp, integer, time } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar().notNull(),
  createdAt: timestamp({ precision: 6, withTimezone: true }).defaultNow().notNull()
});

export const multiplication = pgTable('multiplications', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id),
  sequence: integer().notNull(),
  questions: integer().notNull(),
  correct: integer().notNull(),
  time: time(),
  createdAt: timestamp({ precision: 6, withTimezone: true }).defaultNow().notNull()
});
