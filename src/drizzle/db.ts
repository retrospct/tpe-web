import '@/drizzle/envConfig'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './schema'

export const db = drizzle(sql, { schema })

export const getUsers = async () => {
  const selectResult = await db.select().from(schema.UsersTable)
  console.log('Results', selectResult)
  return db.query.UsersTable.findMany()
}

export const getContactForm = async () => {
  const selectResult = await db.select().from(schema.ContactFormTable)
  console.log('Results', selectResult)
  return db.query.ContactFormTable.findMany()
}

export const createContactForm = async (data: schema.InsertContactForm) => {
  return await db.insert(schema.ContactFormTable).values(data)
}
