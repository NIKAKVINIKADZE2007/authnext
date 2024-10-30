import { serial, pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('Users', {
  id: serial('id').primaryKey(),
  email: text('email').unique(),
  password: text('password'),
  creteAt: timestamp('created-at').defaultNow(),
  twoFactorSecret: text('2fa-secret'),
  twoFactorActivated: boolean('2fa_activated').default(false),
});
