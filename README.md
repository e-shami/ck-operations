# ck-operations

Cloud Krown Operations is building the AI-native workforce for Property Management. It combines property management and accounting specialists, AI agents, and workflow automation to run the back office of U.S. property management companies more efficiently than labor-intensive models.

## Development

Requires Node.js 22 or newer and pnpm 10.30.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Phase 2 adds Hero, Problem, and Solution sections to the responsive layout shell. Their copy is explicitly marked as draft pending owner review. Both hero CTAs scroll to the contact placeholder; remaining sections and the contact form follow in later phases.

If pnpm is not installed globally, use `npx --yes pnpm@10.30.0` in place of `pnpm` for each command.

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

`pnpm start` serves the production build. `pnpm format` formats application and tooling files; project documents are preserved separately.

`.env.example` lists future integration settings. No environment values are required for Phase 0. Email credentials and runtime validation will be added with the contact form in Phase 4; never commit real secrets.

## Project Guidance

Project planning documents in `docs/` are local-only and ignored by Git. If available in your workspace, read `rules.md`, `memory.md`, and `phases.md` before working, alongside `prd.md`, `architecture.md`, and `design.md`. They are not included in a fresh clone.

The application uses Next.js 15, strict TypeScript, and Tailwind CSS 3 with a typed theme configuration. The blue palette is sampled from the supplied legacy logo; the text wordmark retains the current Cloud Krown name until redesigned artwork is available. Plus Jakarta Sans and Inter are loaded through `next/font`. All interface copy lives in `src/content/site.ts`.

The sticky header is translucent navy over the hero and white over light content. The hero graphic is an illustrative AI/automation-to-human workflow, not a product screenshot. Contact details and legal destinations remain visible placeholders rather than fabricated email addresses or broken links.
