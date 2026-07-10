# lily-svelte

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
