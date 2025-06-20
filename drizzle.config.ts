import '@/drizzle/envConfig'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dbCredentials: { url: process.env.POSTGRES_URL! },
  verbose: true
})
