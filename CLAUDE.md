# CLAUDE.md

This file provides context for AI assistants working on the **tpe-web** codebase — the public website for [Two Perfect Events](https://twoperfectevents.com), a wedding and event planning company.

## Project Overview

A content-driven marketing website built with Next.js (App Router) and Prismic CMS. The site features a portfolio of events, blog, team profiles, contact forms, and newsletter signup. It is deployed on Vercel.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript 5.9 (strict mode) |
| CMS | Prismic (Slice Machine) |
| Styling | Tailwind CSS 3.4 + Shadcn/UI |
| Database | PostgreSQL via Vercel Postgres + Drizzle ORM |
| Email | Resend + React Email |
| Forms | React Hook Form + Zod validation |
| Analytics | PostHog, Google Analytics 4, Vercel Speed Insights |
| Package Manager | pnpm |

## Commands

```bash
pnpm dev              # Start Next.js dev server + Slice Machine concurrently
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm typecheck        # TypeScript type checking (tsc --noEmit)
pnpm format           # Prettier format all files
pnpm email:dev        # Start React Email dev server on port 3001
pnpm drizzle          # Drizzle Kit CLI (e.g. pnpm drizzle generate, pnpm drizzle push)
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── [uid]/              # Dynamic Prismic page route
│   ├── about/team/         # Team member profiles
│   ├── api/                # REST API routes (draft, preview, og, resend, revalidate)
│   ├── blog/[uid]/         # Blog post pages
│   ├── portfolio/[uid]/    # Portfolio/event pages
│   ├── services/design/    # Services sub-pages
│   ├── layout.tsx          # Root layout (fonts, nav, footer, providers)
│   ├── page.tsx            # Homepage
│   └── providers.tsx       # PostHog + Prismic preview providers
├── components/             # Reusable UI components
│   ├── ContactForm/        # Contact form with validation
│   ├── SubscribeForm/      # Newsletter subscription
│   ├── Nav/                # Navigation
│   ├── Footer/             # Footer
│   ├── EventsGrid/         # Portfolio grid
│   ├── ImageCarousel/      # Embla carousel
│   ├── ui/                 # Shadcn/UI primitives (18 components)
│   ├── prismic/            # Prismic integration wrappers
│   └── icons/              # Custom brand SVG icons
├── slices/                 # Prismic Slice components (17 slices)
├── drizzle/                # Database layer
│   ├── schema.ts           # Table definitions (users, persons, subscriptions, contactForm)
│   ├── db.ts               # Query functions
│   ├── migrations/         # SQL migrations
│   └── envConfig.ts        # Environment variable loader
├── emails/                 # React Email templates
├── lib/                    # Shared utilities
│   ├── actions.ts          # Server Actions (contact form, subscribe)
│   ├── validations.ts      # Zod schemas
│   └── utils/              # Helper functions
├── styles/
│   └── globals.css         # Tailwind base + CSS custom properties
└── prismicio.ts            # Prismic client, routes, and link resolver
```

**Other root files:**
- `customtypes/` — Prismic custom type JSON definitions (page, post, event, person, portfolio, etc.)
- `slicemachine.config.json` — Slice Machine configuration
- `components.json` — Shadcn/UI configuration
- `drizzle.config.ts` — Drizzle Kit configuration (PostgreSQL)

## Architecture & Patterns

### Content Management (Prismic)
- All page content is managed in Prismic CMS using Slice Machine
- Custom types: `page`, `post`, `event`, `person`, `portfolio`, `category`, `footer`, `nav`, `profile`
- Route resolvers are defined in `src/prismicio.ts`
- Production uses `cache: 'force-cache'` with ISR via Prismic tags; dev uses `revalidate: 5`
- Prismic types are auto-generated in `prismicio-types.d.ts`

### Server Components & Actions
- Pages are Server Components by default; client components are explicitly marked with `'use client'`
- Form submissions use Server Actions in `src/lib/actions.ts` with `useActionState`
- Zod schemas in `src/lib/validations.ts` validate all form inputs server-side

### Styling
- Tailwind utility-first with CSS custom properties for theming (HSL color values in `globals.css`)
- Brand colors: primary (crimson red `#9E3811`), secondary (brown `#5B3613`), accent (pink `#EEC8CB`), background (almond `#EFE4D9`)
- Fonts: `Crimson Pro` (sans/body via Google Fonts), `Belgant Aesthetic` (serif/display, local OTF)
- Dark mode supported via class-based toggling (`next-themes`)
- Shadcn/UI components live in `src/components/ui/` and follow Radix UI patterns

### UI Components
- Shadcn/UI is configured for RSC (`rsc: true` in `components.json`)
- Add new Shadcn components with: `pnpm dlx shadcn@latest add <component>`
- Utility function `cn()` from `src/lib/utils` merges Tailwind classes (clsx + tailwind-merge)

### Email
- Templates built with React Email in `src/emails/`
- Sent via Resend API; batch sending supported for multi-recipient flows
- Dev preview: `pnpm email:dev` on port 3001

### Database
- Drizzle ORM with PostgreSQL (Vercel Postgres)
- Schema in `src/drizzle/schema.ts`: `users`, `persons`, `subscriptions`, `personsToSubscriptions`, `contactForm`
- Migrations in `src/drizzle/migrations/`
- Generate migrations: `pnpm drizzle generate`
- Push schema: `pnpm drizzle push`

### Dynamic Imports
- Heavy components (Calendar, Popover, PostHogPageView, PrismicPreview) use `next/dynamic` with `{ ssr: false }` for code splitting

## Code Style & Conventions

### Formatting (Prettier)
- Single quotes, no semicolons, no trailing commas
- 120 character print width, 2-space indentation
- Plugins: `prettier-plugin-organize-imports` (auto-sorts imports), `prettier-plugin-tailwindcss` (sorts Tailwind classes)

### Linting (ESLint)
- Based on `eslint-config-next/core-web-vitals` + `eslint-config-prettier`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### TypeScript
- Strict mode enabled
- Path aliases: `@/components`, `@/lib`, `@/drizzle/*`, `@/emails`, `@/slices`, `@/styles/*`, `@/prismicio`
- Drizzle uses inferred types: `InsertX` / `SelectX` patterns from `$inferInsert` / `$inferSelect`

### Component Conventions
- Prismic slices export a default component and follow the `SliceComponentProps<ContentType>` pattern
- Reusable components are in `src/components/` with folder-per-component for complex ones
- Client components are explicitly marked; prefer Server Components where possible

## Environment Variables

```
NEXT_PUBLIC_PRISMIC_ENVIRONMENT   # Prismic repository name
NEXT_PUBLIC_POSTHOG_KEY           # PostHog project API key
NEXT_PUBLIC_POSTHOG_HOST          # PostHog API host
POSTGRES_URL                      # PostgreSQL connection string (Vercel Postgres)
RESEND_API_KEY                    # Resend transactional email API key
RESEND_ADMIN_API_KEY              # Resend admin API key (audience/contacts management)
```

## URL Routing

- Prismic route resolvers map content types to URL paths (see `src/prismicio.ts`)
- 100+ legacy URL redirects are configured in `next.config.mjs` (permanent 301s)
- Key routes: `/` (home), `/about`, `/about/team/:uid`, `/services`, `/portfolio/:uid`, `/blog/:uid`, `/contact`

## Deployment

- Hosted on **Vercel**
- PostHog analytics proxied through Next.js rewrites (`/ingest/*`) for privacy
- Image optimization configured for Prismic CDN domains (`images.prismic.io`, `tpe-web.prismic.io`, `static.cdn.prismic.io`)

## Testing

No test framework is currently configured. There are no test files in the codebase. When adding tests, consider Vitest for unit tests and Playwright for E2E tests, which are standard for Next.js projects.
