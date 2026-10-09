# ck-operations

Cloud Krown Operations is building the AI-native workforce for Property Management. It combines property management and accounting specialists, AI agents, and workflow automation to run the back office of U.S. property management companies more efficiently than labor-intensive models.

## Development

Requires Node.js 22.18 or newer and pnpm 10.30.0. Development, type generation, and production builds require the settings listed in `.env.example` to be configured in the ignored `.env.local` file or process environment. Next.js does not load `.env.example` automatically.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. The marketing sections and Phase 4 contact form are implemented. Marketing copy remains draft pending owner review. Live email delivery has not yet been verified; service configuration and browser-level form verification remain outstanding.

If pnpm is not installed globally, use `npx --yes pnpm@10.30.0` in place of `pnpm` for each command.

```sh
pnpm lint
pnpm test
pnpm typecheck
pnpm build
pnpm format:check
```

`pnpm start` serves the production build. `pnpm format` formats application and tooling files; project documents are preserved separately.

## Contact Configuration

- `RESEND_API_KEY`: server-only Resend API key.
- `CONTACT_FROM_EMAIL`: plain email address on a verified Resend sending domain.
- `CONTACT_TO_EMAIL`: private destination inbox.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: server-only Redis REST credentials.
- `NEXT_PUBLIC_CONTACT_EMAIL`: public fallback email displayed in the form and footer. It is separate from the private destination inbox.
- `NEXT_PUBLIC_SITE_URL`: exact browser origin for same-origin checks, such as `http://localhost:3000`. HTTPS is required except on loopback hosts. Configure this per deployment, including previews.
- `NEXT_PUBLIC_BOOKING_URL`: reserved and unused. The current implementation is form-only.

Missing or invalid required values stop startup/build and identify the variable names without printing credentials. Dummy credentials and reserved `.invalid` addresses can be used for UI-only previews, but cannot deliver email or provide working rate limiting. Never submit real personal information in those previews, deploy test-configured build artifacts, or commit real environment files.

The endpoint uses shared Zod validation, a honeypot, a bounded JSON body, and a five-request/ten-minute fixed-window limit. On Vercel, it uses the platform's client-IP header and hashes the identity before storing the rate-limit key. Non-Vercel deployments deliberately share one conservative bucket until trusted-proxy handling is configured. Provider failures and rate-limit timeouts fail closed. Email is plain text, addressed to the configured inbox, with the visitor as Reply-To. Stable submission IDs provide Resend idempotency for retries of unchanged messages.

`pnpm test` uses Node's built-in test runner with mocked provider requests and deliberately fake fixtures; no real accounts or network calls are needed. Real delivery must be verified separately before Phase 4 is complete. The form requires JavaScript; without it, the public email link is the fallback.

## Project Guidance

Project planning documents in `docs/` are local-only and ignored by Git. If available in your workspace, read `rules.md`, `memory.md`, and `phases.md` before working, alongside `prd.md`, `architecture.md`, and `design.md`. They are not included in a fresh clone.

The application uses Next.js 15, strict TypeScript, and Tailwind CSS 3 with a typed theme configuration. The blue palette is sampled from the supplied legacy logo; the text wordmark retains the current Cloud Krown name until redesigned artwork is available. Plus Jakarta Sans and Inter are loaded through `next/font`. All interface copy lives in `src/content/site.ts`.

The sticky header is translucent navy over the hero and white over light content. The hero graphic is an illustrative AI/automation-to-human workflow, not a product screenshot. Legal destinations remain visible placeholders until approved pages exist.
