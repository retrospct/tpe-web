// import { drizzle } from 'drizzle-orm/vercel-postgres';
// import { sql } from '@vercel/postgres';
import { boolean, date, jsonb, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

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

// // customers & other persons
// export const persons = pgTable(
//   'persons',
//   {
//     id: uuid('id').defaultRandom().primaryKey(),
//     name: varchar('name', { length: 256 }).notNull(),
//     email: varchar('email', { length: 256 }).notNull(),
//     phone: varchar('phone', { length: 256 }).notNull(),
//     eventDate: date('eventDate'),
//     referral: varchar('referral', { length: 256 }),
//     // newsletter: boolean('newsletter').default(false),
//     comments: text('comments'),
//     createdAt: timestamp('createdAt').defaultNow().notNull()
//   },
//   (persons) => {
//     return {
//       personIdx: index('person_idx').on(persons.email)
//     }
//   }
// )
// export type InsertPersons = typeof persons.$inferInsert
// export type SelectPersons = typeof persons.$inferSelect

// export const personsRelations = relations(persons, ({ many }) => ({
//   contactForm: many(contactForm),
//   subscriptions: many(subscriptions)
// }))

export const contactForm = pgTable(
  'contact_form',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    // pid: uuid('pid')
    //   .references(() => persons.id, { onDelete: 'cascade' })
    //   .notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    phone: varchar('phone', { length: 256 }).notNull(),
    referral: varchar('referral', { length: 256 }),
    eventDate: date('eventDate'),
    newsletter: boolean('newsletter').default(false),
    comments: text('comments'),
    raw: jsonb('raw'),
    createdAt: timestamp('createdAt').defaultNow().notNull()
  }
  // (contact_form) => {
  //   return {
  //     contactIdx: index('contact_idx').on(contact_form.email)
  //   }
  // }
)
export type InsertContactForm = typeof contactForm.$inferInsert
export type SelectContactForm = typeof contactForm.$inferSelect

// export const contactFormRelations = relations(contactForm, ({ one }) => ({
//   author: one(persons, {
//     fields: [contactForm.pid],
//     references: [persons.id]
//   })
// }))

// export const subscriptions = pgTable(
//   'contact_form',
//   {
//     id: uuid('id').defaultRandom().primaryKey(),
//     pid: uuid('pid')
//       .references(() => persons.id, { onDelete: 'cascade' })
//       .notNull(),
//     newsletter: boolean('newsletter').default(false),
//     createdAt: timestamp('createdAt').defaultNow().notNull()
//   }
// )
// export type InsertSubscriptions = typeof subscriptions.$inferInsert
// export type SelectSubscriptions = typeof subscriptions.$inferSelect

// export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
//   subscriber: one(persons, {
//     fields: [subscriptions.pid],
//     references: [persons.id]
//   })
// }))
