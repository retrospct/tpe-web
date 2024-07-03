// import { drizzle } from 'drizzle-orm/vercel-postgres';
// import { sql } from '@vercel/postgres';
import { boolean, date, index, jsonb, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

export const UsersTable = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    name: varchar('name', { length: 256 }).notNull(),
    image: text('image'),
    createdAt: timestamp('createdAt').defaultNow().notNull()
  },
  (users) => {
    return {
      userIdx: uniqueIndex('user_idx').on(users.email)
    }
  }
)

export const ContactFormTable = pgTable(
  'contact_form',
  {
    // id: serial('id').primaryKey(),
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    phone: varchar('phone', { length: 256 }).notNull(),
    eventDate: date('eventDate'),
    comments: text('comments'),
    referral: varchar('referral', { length: 256 }),
    newsletter: boolean('newsletter').default(false),
    raw: jsonb('raw'),
    createdAt: timestamp('createdAt').defaultNow().notNull()
  },
  (contact_form) => {
    return {
      contactIdx: index('contact_idx').on(contact_form.email)
    }
  }
)

export type InsertContactForm = typeof ContactFormTable.$inferInsert
export type SelectContactForm = typeof ContactFormTable.$inferSelect
