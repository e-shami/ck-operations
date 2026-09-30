# ck-operations

Cloud Krown Operations is building the AI-native workforce for Property Management. It combines property management and accounting specialists, AI agents, and workflow automation to run the back office of U.S. property management companies more efficiently than labor-intensive models.

## Development

Requires Node.js 22 or newer and pnpm 10.30.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Phase 0 intentionally renders an empty page; design and content follow in later phases.

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

Before writing code, read [rules](docs/rules.md), [memory](docs/memory.md), and the current [phase](docs/phases.md).

- [Product requirements](docs/prd.md)
- [Architecture](docs/architecture.md)
- [Proposed design](docs/design.md)

The scaffold uses Next.js 15, strict TypeScript, and Tailwind CSS 3 with a typed theme configuration. Design tokens and fonts await approval in Phase 1. Feature-specific routes, assets, and integrations are added in their respective phases, not as nonfunctional stubs.
