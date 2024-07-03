DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
ALTER TABLE "contact_form" ADD COLUMN "raw" jsonb;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_idx" ON "users" USING btree ("email");