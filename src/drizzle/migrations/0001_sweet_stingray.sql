ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_pid_persons_id_fk";
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "pid";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "referral";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "eventDate";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "newsletter";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "comments";