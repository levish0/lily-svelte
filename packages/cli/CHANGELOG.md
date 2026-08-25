# lily-svelte

## 0.3.0

### Minor Changes

- [#51](https://github.com/levish0/lily-svelte/pull/51) [`8aecdda`](https://github.com/levish0/lily-svelte/commit/8aecdda795f30861c34a2836df0d82957b340295) Thanks [@levish0](https://github.com/levish0)! - Add `form`, `copy-button`, `image-cropper` and `link`, and extend `field` with `Set`, `Legend` and `Separator`.

  - **New component: `form`** — [Formsnap](https://formsnap.dev) + [Superforms](https://superforms.rocks) bindings for lily's `Field` parts. `Form.Field`, `Form.Fieldset`, `Form.Legend`, `Form.Control`, `Form.Label`, `Form.Description`, `Form.FieldErrors`, `Form.ElementField` and `Form.Button` render the matching `Field` part and only add form state, so a `Form.Label` looks exactly like a `FieldLabel`. `formsnap` and `sveltekit-superforms` are installed with the component.
  - **New component: `copy-button`** — a `Button` that writes `text` to the clipboard and swaps its icon to a check (or a cross on failure) for `delay` ms. Built on the new **`use-clipboard`** hook, which is installed alongside it and can be used on its own.
  - **New component: `image-cropper`** — pick a file, crop it in a `Dialog` (round or rect, any aspect), and get the result back through `bind:src` / `onCropped`; `getFileFromUrl` turns it into a `File` for upload. Includes a `Zoom` slider on top of pinch and wheel. Built on `svelte-easy-crop`.
  - **New component: `link`** — an anchor styled with the `.link` underline animation from the base stylesheet. External `href`s open in a new tab with `rel="noopener noreferrer"` automatically; `external`, `target` and `rel` override it.
  - **`field` gains `FieldSet`, `FieldLegend` and `FieldSeparator`** — a `<fieldset>` / `<legend>` pair for grouping controls, and a divider with an optional label on the line.

## 0.2.3

### Patch Changes

- [`51b5362`](https://github.com/levish0/lily-svelte/commit/51b53624512649e67359d9f4ea0aa36f616909ab) Thanks [@levish0](https://github.com/levish0)! - Add avatar groups, initials fallback and status badges.

  - **New parts: `AvatarGroup` / `AvatarGroupCount`** — overlapping avatar stacks with `spacing` (tight/default/loose) and a `+N` counter. The ring that separates stacked avatars reads from `--avatar-ring`, which defaults to the page background and can be repointed at `--bg-elevated` inside cards, dialogs and popovers.
  - **New part: `AvatarBadge`** — a status dot pinned to the avatar that scales with the parent's `size`, and hides any glyph at `xs`/`sm` where there is no room for one.
  - **`Avatar` gains `fallback`** — a string for initials or a snippet for custom content, still falling back to the placeholder icon when omitted. A changed `src` now retries after a previous load failure instead of staying on the fallback.

## 0.2.2

### Patch Changes

- [`8574db7`](https://github.com/levish0/lily-svelte/commit/8574db74dcb8454e8d9c15019a172ba7ac05237c) Thanks [@levish0](https://github.com/levish0)! - Point the registry base URL at the new Workers deployment. The docs site moved from Cloudflare Pages (`lily-svelte.pages.dev`) to Workers (`lily-svelte.levish.workers.dev`), and the old origin is going away.

## 0.2.1

### Patch Changes

- [`49aed15`](https://github.com/levish0/lily-svelte/commit/49aed1527f06546d5329f7fcb5e788f1735d957a) Thanks [@levish0](https://github.com/levish0)! - feat(docs): add code-block registry component"

## 0.2.0

### Minor Changes

- [`46d1beb`](https://github.com/levish0/lily-svelte/commit/46d1beb84a9b59d5b4d1ee6d56cc263c5af2c74f) Thanks [@levish0](https://github.com/levish0)! - Add the Chart component, chart color tokens and the /charts gallery.

  - **New component: `chart`** — themed `Chart.Container` and `Chart.Tooltip` wrappers for [LayerChart](https://layerchart.com) (v2), so any LayerChart chart drops into a lily project. Install with `lily-svelte add chart`.
  - **New tokens: `--chart-1` … `--chart-5`** — a 5-color chart palette (with dark-mode variants) added to `lily/tailwind.css`, the one sanctioned color surface in the otherwise monochrome system. Override the variables to theme every chart at once.
  - **New: chart blocks & /charts gallery** — 12 ready-made charts across area, bar, line, pie, radar, radial and tooltip categories, browsable at `/charts/[type]` with per-chart source viewer (Sheet on desktop, Drawer on mobile) and installable via the CLI (e.g. `lily-svelte add chart-area-stacked`).
  - **Blocks improvements** — the login block's password field now uses the `Password` component (show/hide toggle), small screens render the live block preview instead of a link, and the preview resize handle now matches the intended subtle pill style.

## 0.1.0

### Minor Changes

- [`26d5624`](https://github.com/levish0/lily-svelte/commit/26d5624ef642dcd7469c894c806dd22dd94824a3) Thanks [@levish0](https://github.com/levish0)! - Add the Sidebar component and the Blocks registry.

  - **New component: `sidebar`** — a composable app sidebar with 24 parts (Provider, Root, Trigger, Rail, Inset, Group/Menu/Sub-menu parts and more). Supports `side` (left/right), `variant` (sidebar/floating/inset) and `collapsible` (offcanvas/icon/none) modes, keyboard shortcut (Cmd/Ctrl+B), cookie state persistence, tooltips when collapsed to icons, and automatic Sheet rendering on mobile. Install with `lily-svelte add sidebar`.
  - **New hook: `is-mobile`** — the first registry hook (`registry:hook`), built on `svelte/reactivity`'s `MediaQuery`.
  - **New: Blocks** — ready-made full-page examples installable via the CLI (`lily-svelte add sidebar-05`): five sidebar variants (`sidebar-01`–`05`), `login-01`, `signup-01` (with password strength), `otp-01` and `calendar-01`. Browse them at `/blocks` with category tabs, a resizable full-screen iframe preview and a per-file source viewer.
  - **Docs fix:** component pages no longer render the demo source twice — the highlighted code now lands inside the Preview/Code tabs (mdsx `rehypeComponentExample` raw-node split).

## 0.0.5

### Patch Changes

- [`8f20a77`](https://github.com/levish0/lily-svelte/commit/8f20a77fe5de67ba53ca7f7ffabd6827d71fd5b9) Thanks [@levish0](https://github.com/levish0)! - Add a README to the published CLI package so it renders on npmjs.com.

## 0.0.4

### Patch Changes

- [`09212c2`](https://github.com/levish0/lily-svelte/commit/09212c2e3b6ffb7c2e70f667bdddfa6b8178a1da) Thanks [@levish0](https://github.com/levish0)! - Add the `pm-command` component to the registry — a package-manager-aware command block with npm/pnpm/yarn/bun tabs and copy-to-clipboard, installable via `lily-svelte add pm-command`.

## 0.0.3

### Patch Changes

- [`ea7e79b`](https://github.com/levish0/lily-svelte/commit/ea7e79b67d38df2bda7107902f41480ec4c4e4bc) Thanks [@levish0](https://github.com/levish0)! - init: write the full lily design system straight into the user's stylesheet — so they own and can edit every token — instead of `@import "lily/tailwind.css"`, which pointed at a package that doesn't exist and broke `lily-svelte init` with "Can't resolve 'lily/tailwind.css'".

## 0.0.2

### Patch Changes

- smol update ([`16d74b1`](https://github.com/levish0/lily-svelte/commit/16d74b1acc5c957056dcfc0894bcdc7e78a6c48c))
