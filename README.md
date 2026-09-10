# ChaloPG — editable source handover

## Status: public-interface checkpoint, not a complete marketplace

This ZIP contains the entire **currently implemented** modular Next.js application. It is not the completed approved full-stack scope. Do not launch it as a working property marketplace.

Implemented:
- Original light ChaloPG homepage, responsive navigation, city/locality/category links, accommodation imagery, FAQ and owner CTA.
- `/pgs` filters encoded in the URL: city, locality, budget, room sharing, property type, gender policy, amenities, availability and sort preference.
- Explicit listing and map service-unavailable states. Filters survive reload in the URL, but do not query a database.
- `/login` and `/signup` disabled account entry screens. `/owner` and `/account` redirect to login with a validated return destination. These are NOT an implemented authentication system.
- `/setup` tracks outstanding work. Property slugs return a not-found page; property details are not implemented.
- TypeScript checking, production compilation, and safe source packaging.

Blocked/pending:
- The service inventory tool returned an argument-validation error. Existing database/auth/storage connections could not be established; no duplicate resource was provisioned.
- No database code, auth handler, migration, seed tooling, storage endpoint, Google Maps SDK, owner dashboard, listing CRUD, saved-property mutation, enquiry submission, or visit workflow has been implemented.
- Supplying environment variables alone will NOT enable those features. They need implementation after service verification.
- No owner/tenant personal data is collected. No localStorage or fake sessions are used.
- No production deployment was performed. No backend acceptance journey has passed.

## Open and edit

Prefer connecting a user-owned GitHub repository through v0 project settings for version history, review and preview deployments. Repository connection/push changes require authorization. The provided ZIP is also fully editable after extraction on your own computer.

Local prerequisites: Node.js 22 LTS and pnpm 10.34.3. A developer working locally can use:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

For a production check:

```sh
pnpm build
pnpm exec tsc --noEmit
pnpm start
```

In v0, use the running preview rather than a terminal. No environment variables are required to run the current UI checkpoint. Google Fonts requires network access when building.

## Where to change things

| Change | Files |
| --- | --- |
| Brand and main navigation | `components/site-header.tsx` |
| Colors, spacing primitives and motion | `app/globals.css` |
| Font, metadata and theme color | `app/layout.tsx` |
| Browser icon | `app/icon.tsx` |
| Homepage copy, category imagery, benefits, owner CTA | `components/home-sections.tsx` |
| Section order | `app/page.tsx` |
| FAQs | `components/faq.tsx` |
| Footer links | `components/site-footer.tsx` |
| Homepage search form | `components/search-form.tsx` |
| Search fields | `components/discovery-filters.tsx` |
| Search normalization, cities and property types | `lib/search.ts` |
| Results and map-unavailable states | `app/pgs/page.tsx` |
| Account entry screens | `components/auth-entry.tsx` |
| Outstanding implementation status | `app/setup/page.tsx` |
| Headers and build configuration | `next.config.mjs` |
| ZIP allowlist | `scripts/package-project.mjs` |

Listing fields and dashboard features are not present yet. Implement these in modular `app/owner`, `components`, and server-only `lib` modules after choosing the real connected providers. Never replace unavailable screens with simulated successes.

## Photography and reference

Three generated accommodation-style illustrations live in `public/images/`. They are not actual available properties. The previously mentioned uploaded ZIP was not accessible in this session; no compiled bundle was executed or copied. Shelterly was inspected for desktop/mobile discovery patterns; no branding, listings, claims or photographs were copied from it.

## Remaining service and implementation checklist

1. Retry the project integration inventory with only the `fetchAll` mode. Reuse any suitable existing database, authentication and storage resources.
2. If none exist, request Neon and private Blob through v0's integration setup. Follow the current Neon-on-Vercel and Better Auth guidance. Confirm actual injected variable names; do not manually distribute provider credentials. Vercel, database, storage, and Google Maps may charge separately.
3. Before auth code, securely provide a random `BETTER_AUTH_SECRET` of at least 32 characters. Use email/password auth, real server-side sessions, exact trusted origins, and development `SameSite=None; Secure` cookies as required for the preview. Add a canonical auth URL only when the stable real domain is known. Do not use wildcard shared-host origins.
4. Implement the approved schema: provider auth tables, owner profiles, properties, room options, photos, saved-property pairs, and tenant requests. Store monetary values as integer minor units and times consistently, displaying Asia/Kolkata. Scope all private reads/writes to the authenticated user. Index public filters and owner/request lookups; enforce unique slugs and saved pairs.
5. Validate nonnegative prices, integral capacities, available beds not exceeding capacity, bounded coordinates, future visit dates, upload MIME/type/size/count and lifecycle transitions. Use safe parameterized queries, CSRF/session protections, duplicate-submission protection and controlled errors. Do not log contact details.
6. Implement draft/published/paused/archived lifecycle; validate completeness before publishing. Publishing must never imply independent verification. Archive without deleting request history.
7. Review migrations and get explicit permission for the intended database before applying them. There is no migration command in this version. Do not auto-migrate on every build or reset production. Use separate non-production and production resources where possible and plan recovery for later migrations.
8. Implement authenticated private-Blob uploads and server-mediated photo access. Serve photos only for a published listing or its authenticated owner. Never expose a draft photo through a public CDN URL.
9. Seed only clearly labeled non-production examples once into the real database, not runtime arrays. Sample properties must not accept requests for fictional owners. No seed data is provided in this checkpoint.
10. Implement owner registration, publishing and request management, then tenant saves, consent-based enquiries and future visit proposals. An accepted visit is not a booking or inventory reservation. In-app enquiries only; no notifications, payments, rent collection, KYC or moderation console.

## Google Maps setup (pending implementation)

- Create/select a Google Cloud project and enable billing, Maps JavaScript API and Places API (New).
- Create a JavaScript map ID and a browser key restricted to the required APIs and exact allowed preview/production website referrers. Do not use broad shared-host wildcards or an unrestricted key.
- Future planned browser variable names are `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`; they are documented but not consumed in current code.
- Get the real preview origin from the active project. Do not assume localhost is its public origin. Add production/custom-domain referrers only once known.
- Implement lazy loading, India-restricted Places New autocomplete with minimal fields, accessible AdvancedMarkerElement interactions, list/marker synchronization, explicit Search-this-area bounds, mobile list/map mode, attribution and invalid-key fallback. List discovery must work independently of Maps.

## Preview acceptance checklist before launch

Current automated/interactive verification: TypeScript and production build; desktop/current-preview/mobile rendered checks; homepage search URL; filter changes and reload persistence; map unavailable state; owner/tenant redirects and disabled account controls. The build never ignores TypeScript errors.

Still required, not tested because the backend does not exist: successful signup/login/session reload/logout, two-owner property/request/photo isolation, tenant privacy, real photo uploads, publish validation, published-vs-draft photo access, map autocomplete/marker/bounds behavior, saved-property persistence, and tenant visit request -> owner acceptance -> tenant tracking. Also complete a comprehensive keyboard/accessibility audit and reduced-motion review.

Run these journeys against a protected Vercel Preview deployment after service implementation. Do not disable deployment protection merely to test. Check real errors, loading states and returned data, not just compilation.

## Deployment and launch — only after completing the above

1. Confirm the correct user-owned Vercel project/team and each resource connection. Configure environment targets separately for Development, Preview and Production. `.env.example` contains names only, not usable credentials.
2. Finish backend implementation, review/apply migrations with explicit permission and pass the acceptance checklist. This checkpoint is not launch-ready.
3. Have the business supply and review its privacy policy, terms, contact details and listing practices before collecting real data. No legal-compliance certification is implied.
4. Obtain explicit launch approval. Use v0's Publish UI at the top right for the linked Vercel project. Use the Vercel-provided domain initially if a custom domain is not ready.
5. Inspect build/runtime failures and verify the deployed URL is reachable. Retest authentication, maps, publishing and requests on the real deployment before declaring success. Public variable changes require a rebuild/redeployment.
6. To use a custom domain, add your owned domain in the Vercel project's Domains settings and apply the exact DNS records Vercel displays at your registrar. Wait for verification and HTTPS. Do not invent generic DNS targets.
7. Choose a canonical domain, update exact auth origins and Maps referrers, redeploy and retest. Never paste secret values in source, chat, screenshots or the ZIP.
8. Publish real owner-controlled listings and hide all sample inventory before launch. Check mobile layout, metadata, privacy and HTTPS.

## Packaging and future edits

```sh
pnpm package:source
pnpm package:verify
```

`package:source` creates `public/downloads/chalopg-source.zip` using an explicit file allowlist. The allowlist must be updated when adding new source files. Only the three named public illustrative images are included. ZIP output, private content, actual .env files, logs, dependency/build directories, Git metadata, read-only context and personal data are excluded. Never put secrets in source code; archive safety is not a substitute for source review.

`package:verify` packages, checks entry names, extracts into a fresh temporary directory, installs frozen dependencies, runs a production build and type-checks the extracted project. It needs network access and does not create a deployment. The temporary extraction contains only allowlisted source files.

The downloadable artifact includes all implemented source, shared UI, local imagery, manifests/lockfile, framework configuration, this guide and packaging tools. It intentionally contains no database schema/migrations/seed tools because those remain blocked and unimplemented; it must not be represented as the finished full-stack handover.

Future updates: edit -> preview -> test -> production promotion. Inspect Vercel build/runtime logs for failures. Roll back to a known-good deployment when appropriate; a code rollback does not undo database migrations. The ZIP is a code snapshot, not a backup of databases, private Blob uploads, Google Cloud configuration, Vercel environment settings or hosted resources. Those need separate provisioning or authorized backup.
