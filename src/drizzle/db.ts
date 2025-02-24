import '@/drizzle/envConfig'
import { sql } from '@vercel/postgres'
import { and, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { log } from '@/lib/utils/functions/log'
import * as schema from './schema'

export const db = drizzle(sql, { schema })

export const getUsers = async () => {
  try {
    return await db.query.users.findMany()
  } catch (error) {
    await log({
      message: `Database error in getUsers: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const getContactForm = async () => {
  try {
    return await db.query.contactForm.findMany()
  } catch (error) {
    await log({
      message: `Database error in getContactForm: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const createContactForm = async (data: schema.InsertContactForm) => {
  try {
    return await db.insert(schema.contactForm).values(data)
  } catch (error) {
    await log({
      message: `Database error in createContactForm: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const createPerson = async (data: schema.InsertPersons) => {
  try {
    const personExists = await db.query.persons.findMany({ 
      where: eq(schema.persons.email, data.email) 
    })
    if (personExists?.length > 0) return personExists
    return await db.insert(schema.persons).values(data).returning()
  } catch (error) {
    await log({
      message: `Database error in createPerson: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const getPersons = async () => {
  try {
    return await db.query.persons.findMany({ 
      with: { personsToSubscriptions: true } 
    })
  } catch (error) {
    await log({
      message: `Database error in getPersons: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const createSubscription = async (data: schema.InsertSubscriptions) => {
  try {
    const subscriptionExists = await db.query.subscriptions.findMany({ 
      where: eq(schema.subscriptions.name, data.name) 
    })
    if (subscriptionExists?.length > 0) return subscriptionExists
    return await db.insert(schema.subscriptions).values(data).returning()
  } catch (error) {
    await log({
      message: `Database error in createSubscription: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const getSubscriptions = async () => {
  try {
    return await db.query.subscriptions.findMany({ 
      with: { personsToSubscriptions: true } 
    })
  } catch (error) {
    await log({
      message: `Database error in getSubscriptions: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const getSubscription = async ({ id, name }: { id?: string; name?: string }) => {
  try {
    if (id && !name) {
      return await db.query.subscriptions.findFirst({ 
        where: eq(schema.subscriptions.id, id) 
      })
    }
    if (name && !id) {
      return await db.query.subscriptions.findFirst({ 
        where: eq(schema.subscriptions.name, name) 
      })
    }
    if (id && name) {
      return await db.query.subscriptions.findFirst({ 
        where: and(
          eq(schema.subscriptions.id, id),
          eq(schema.subscriptions.name, name)
        ) 
      })
    }
    return null
  } catch (error) {
    await log({
      message: `Database error in getSubscription: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const createPersonsToSubscriptions = async (data: schema.InsertPersonsToSubscriptions) => {
  try {
    const personToSubscriptionExists = await db.query.personsToSubscriptions.findMany({
      where: and(
        eq(schema.personsToSubscriptions.personId, data.personId),
        eq(schema.personsToSubscriptions.subscriptionId, data.subscriptionId)
      )
    })
    if (personToSubscriptionExists?.length > 0) return personToSubscriptionExists
    return await db.insert(schema.personsToSubscriptions).values(data)
  } catch (error) {
    await log({
      message: `Database error in createPersonsToSubscriptions: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}

export const getPersonsToSubscriptions = async () => {
  try {
    return await db.query.personsToSubscriptions.findMany()
  } catch (error) {
    await log({
      message: `Database error in getPersonsToSubscriptions: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors'
    }).catch(() => {})
    throw error
  }
}
