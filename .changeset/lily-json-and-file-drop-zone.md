---
'lily-svelte': minor
---

Rename the project config to `lily.json`, and give `file-drop-zone` its size and accept constants.

**Breaking:** the CLI now reads and writes `lily.json` instead of `components.json`. Running `init` on an existing lily project moves the settings across and removes the old file, so there is nothing to do by hand.

- **`components.json` → `lily.json`** — the old name is also shadcn-svelte's, and both tools default to `$lib/components/ui`, so a project could only ever host one of them. Worse, lily could not tell its own config from shadcn's: running `init` in a shadcn project inherited that project's `registry`, failed on the first fetch, and left the user's config half-rewritten. lily now only reads a `components.json` that points at a lily registry or schema, and ignores a foreign one entirely — which also makes gradual migration possible, with shadcn staying in `$lib/components/ui` while lily is installed under a different alias.
- **`file-drop-zone` exports `BYTE` / `KILOBYTE` / `MEGABYTE` / `GIGABYTE` and `ACCEPT_IMAGE` / `ACCEPT_VIDEO` / `ACCEPT_AUDIO`** — the natural companions to `maxFileSize` and `accept`, which every project was re-declaring. They are 1024-based, matching `displaySize` and the server limits they usually mirror (nginx's `client_max_body_size 10m` and body-parser's `'10mb'` are both 1024-based, so 1000-based constants would reject files the server would have accepted).
