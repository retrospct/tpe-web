// import { drizzle } from 'drizzle-orm/vercel-postgres';
// import { sql } from '@vercel/postgres';
import { relations } from 'drizzle-orm'
import {
  boolean,
  date,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'

// tpe users & admins
export const users = pgTable(
  'users',
  {
    // id: serial('id').primaryKey(),
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
export type InsertUsers = typeof users.$inferInsert
export type SelectUsers = typeof users.$inferSelect

// customers & other persons
export const persons = pgTable(
  'persons',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 256 }).unique().notNull(),
    name: varchar('name', { length: 256 }),
    phone: varchar('phone', { length: 256 }),
    eventDate: date('eventDate'),
    comments: text('comments'),
    referral: varchar('referral', { length: 256 }),
    createdAt: timestamp('createdAt').defaultNow().notNull()
  },
  (persons) => {
    return {
      personIdx: uniqueIndex('person_idx').on(persons.email)
    }
  }
)
export type InsertPersons = typeof persons.$inferInsert
export type SelectPersons = typeof persons.$inferSelect

export const personsRelations = relations(persons, ({ many }) => ({
  personsToSubscriptions: many(personsToSubscriptions)
}))

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  // pid: uuid('pid')
  //   .references(() => persons.id, { onDelete: 'cascade' })
  //   .notNull(),
  // email: varchar('email', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description'),
  // phone: varchar('phone', { length: 256 }).notNull(),
  // referral: varchar('referral', { length: 256 }),
  // eventDate: date('eventDate'),
  // newsletter: boolean('newsletter').default(true),
  // comments: text('comments'),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})
export type InsertSubscriptions = typeof subscriptions.$inferInsert
export type SelectSubscriptions = typeof subscriptions.$inferSelect

export const subscriptionsRelations = relations(subscriptions, ({ many }) => ({
  personsToSubscriptions: many(personsToSubscriptions)
}))

export const personsToSubscriptions = pgTable(
  'persons_to_subscriptions',
  {
    personId: uuid('person_id')
      .notNull()
      .references(() => persons.id, { onDelete: 'cascade' }),
    subscriptionId: uuid('subscription_id')
      .notNull()
      .references(() => subscriptions.id)
  },
  (t) => ({ pk: primaryKey({ columns: [t.personId, t.subscriptionId] }) })
)
export type InsertPersonsToSubscriptions = typeof personsToSubscriptions.$inferInsert
export type SelectPersonsToSubscriptions = typeof personsToSubscriptions.$inferSelect

export const personsToSubscriptionsRelations = relations(personsToSubscriptions, ({ one }) => ({
  subscription: one(subscriptions, {
    fields: [personsToSubscriptions.subscriptionId],
    references: [subscriptions.id]
  }),
  person: one(persons, {
    fields: [personsToSubscriptions.personId],
    references: [persons.id]
  })
}))

export const contactForm = pgTable('contact_form', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }).notNull(),
  eventDate: date('eventDate'),
  comments: text('comments'),
  referral: varchar('referral', { length: 256 }),
  newsletter: boolean('newsletter').default(false),
  raw: jsonb('raw'),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})
export type InsertContactForm = typeof contactForm.$inferInsert
export type SelectContactForm = typeof contactForm.$inferSelect
