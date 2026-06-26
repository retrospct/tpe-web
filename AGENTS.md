# AGENTS.md

## Cursor Cloud specific instructions

This is a single-package Next.js 16 (App Router, Turbopack) + React 19 marketing
site (`tpe-web`) for a wedding/event-planning company. Content comes from the
Prismic CMS; package manager is **pnpm**. Standard commands live in
`package.json` `scripts` and the `README.md` — refer to those rather than
duplicating them here.

### Running the app

- `pnpm dev` runs the Next.js dev server (port **3000**) **and** Slice Machine
  (port **9999**) concurrently. Use `pnpm next:dev` to run just the site on
  3000 — this is usually all you need; Slice Machine is only for editing Prismic
  slice models.
- The site **renders real content with no secrets / `.env` file**: the Prismic
  Content API for repo `tpe-web` is public and read-only, so all pages (home,
  about, blog, portfolio, services, contact) return 200 with live content out of
  the box.

### Non-obvious gotchas

- **External integrations degrade gracefully.** Resend (email), Vercel Postgres,
  and Cloudflare Turnstile are all null-guarded. Without `RESEND_API_KEY`,
  `POSTGRES_URL`, etc., the app still runs and the contact form **succeeds**:
  the contact server action no-ops the email send (logs `Resend is not
  configured...`) and DB writes are currently commented out, so it returns
  "Thank you! We will get back to you as soon as possible." This makes the
  contact form a good no-secrets end-to-end smoke test.
- The contact + newsletter forms use **server actions** in `src/lib/actions.ts`,
  not the API routes. `src/app/api/resend/contact/route.ts` is unused (it even
  says so in a comment). Don't expect DB rows or emails in dev.
- `POSTGRES_URL` is only needed for `pnpm drizzle` (drizzle-kit migrations /
  studio) and would only affect the app if the commented-out DB writes in
  `src/lib/actions.ts` are re-enabled.
- Node v18+ works; CI uses no pinned version (no `.nvmrc`/`engines`). pnpm
  respects `pnpm-workspace.yaml` `onlyBuiltDependencies` for native builds
  (sharp, esbuild, @swc/core, etc.) — install is non-interactive.

### Checks

- Lint: `pnpm lint` (ESLint 9, flat config). Typecheck: `pnpm typecheck`
  (`tsc --noEmit`). Build: `pnpm build`. There is no automated test suite.
