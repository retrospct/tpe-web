import '@/drizzle/envConfig'
import { sql } from '@vercel/postgres'
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
  return await db.insert(schema.contactForm).values(data).onConflictDoNothing()
}
