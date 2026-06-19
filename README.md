# lily

A calm, rounded **Svelte 5** component library — one unified, soft, monochrome style.
Components are **copy-paste** (you own the code), installed with a CLI from a hosted registry,
shadcn-style.

## Usage

In a SvelteKit + Tailwind v4 project:

```sh
npx lily-svelte@latest init          # one-time: base styles + utils + config
npx lily-svelte@latest add button    # add a component (and its dependencies)
```

The source is written into `$lib/components/ui/*` — yours to edit. The CLI fetches components from
the registry URL configured in `packages/cli/src/constants.ts`.

## Development

pnpm monorepo, Node 24:

| Path                | What                                                      |
| ------------------- | --------------------------------------------------------- |
| `packages/cli`      | the `lily-svelte` CLI (the only package published to npm) |
| `packages/registry` | registry build helpers (internal)                         |
| `docs`              | docs site + the component source / registry               |

```sh
pnpm install
pnpm dev          # CLI watch + docs at localhost:5173
pnpm check        # type/lint checks
```

## Releasing the CLI

The `lily-svelte` CLI is published to npm with [Changesets](https://github.com/changesets/changesets).
A push to `main` never publishes by itself — it's gated by a version PR:

1. After a CLI change: `pnpm changeset` (pick the bump, write a summary), then commit and merge to `main`.
2. The **Publish** workflow opens a `version packages` PR (bumps the version + CHANGELOG).
3. **Merging that PR** runs `changeset publish` → the CLI is published to npm.

Auth is via npm **Trusted Publishing** (OIDC) — no `NPM_TOKEN` secret. One-time setup: publish
`lily-svelte` once manually to create the package, then add a trusted publisher on npmjs.com
(_Settings → Trusted Publishing_) for repo `levish0/lily-svelte`, workflow `release.yml`.

> Component additions ship with the registry (the deployed site), not via a CLI changeset.

## License

MIT
