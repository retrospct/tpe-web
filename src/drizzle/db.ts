import '@/drizzle/envConfig'
import { sql } from '@vercel/postgres'
import { and, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './schema'

export const db = drizzle(sql, { schema })

export const getUsers = async () => {
  const selectResult = await db.select().from(schema.users)
  console.log('Results', selectResult)
  return db.query.users.findMany()
}

export const getContactForm = async () => {
  const selectResult = await db.select().from(schema.contactForm)
  console.log('Results', selectResult)
  return db.query.contactForm.findMany()
}

export const createContactForm = async (data: schema.InsertContactForm) => {
  return await db.insert(schema.contactForm).values(data)
}

export const createPerson = async (data: schema.InsertPersons) => {
  const personExists = await db.query.persons.findMany({ where: eq(schema.persons.email, data.email) })
  // console.log('personExists', personExists)
  if (personExists?.length > 0) return personExists
  return await db.insert(schema.persons).values(data).returning()
}

export const getPersons = async () => {
  return await db.query.persons.findMany({ with: { personsToSubscriptions: true } })
}

export const createSubscription = async (data: schema.InsertSubscriptions) => {
  const subscriptionExists = await db.query.subscriptions.findMany({ where: eq(schema.subscriptions.name, data.name) })
  if (subscriptionExists?.length > 0) return subscriptionExists
  return await db.insert(schema.subscriptions).values(data).returning()
}

export const getSubscriptions = async () => {
  return await db.query.subscriptions.findMany({ with: { personsToSubscriptions: true } })
}

export const getSubscription = async ({ id, name }: { id?: string; name?: string }) => {
  if (id && !name) return await db.query.subscriptions.findFirst({ where: eq(schema.subscriptions.id, id) })
  if (!id && name) return await db.query.subscriptions.findFirst({ where: eq(schema.subscriptions.name, name) })
  console.error('getSubscription error, possibly missing query parameter...')
  return []
}

export const createPersonsToSubscriptions = async (data: schema.InsertPersonsToSubscriptions) => {
  const personToSubscriptionExists = await db.query.personsToSubscriptions.findMany({
    where: and(
      eq(schema.personsToSubscriptions.personId, data.personId),
      eq(schema.personsToSubscriptions.subscriptionId, data.subscriptionId)
    )
  })
  // console.log('personToSubscriptionExists', personToSubscriptionExists)
  if (personToSubscriptionExists?.length > 0) return personToSubscriptionExists
  return await db.insert(schema.personsToSubscriptions).values(data)
}

export const getPersonsToSubscriptions = async () => {
  return await db.query.personsToSubscriptions.findMany()
}
