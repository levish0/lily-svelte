# lily-svelte

## 0.6.0

### Minor Changes

- [`0e9e08f`](https://github.com/levish0/lily-svelte/commit/0e9e08fd741da0fcfafc375f0c8d235b074c03f1) Thanks [@levish0](https://github.com/levish0)! - Add optional compound triggers to File Drop Zone while preserving whole-zone file selection by default.

## 0.5.0

### Minor Changes

- [`baf5e21`](https://github.com/levish0/lily-svelte/commit/baf5e21b64a455dd91d28a7b60a5ed730653d23b) Thanks [@levish0](https://github.com/levish0)! - Make the design system a managed region, so `update` can actually update it.

  **Breaking:** the lily block in your stylesheet is rewritten with begin/end markers the first time you run `lily update`. If you edited it, the CLI stops and shows you what differs rather than replacing it.

  lily writes its whole design system — tokens, base rules, `.link`, the custom variants, the keyframes — straight into your stylesheet so you own it. The catch was that it only ever knew "is a lily block present", so once one existed it was skipped forever: every later improvement to the tokens reached new projects only. `init` even claimed the file "will be overwritten" while doing nothing of the sort.

  The block is now delimited and carries a digest of what the CLI wrote:

  ```css
  /* lily design system v0.5.0 — managed by the lily CLI; yours to edit.
     … <sha256> */
  …
  /* end lily design system */
  ```

  That gives `update` three honest answers: the block still matches what lily shipped, so replace it; it does not, so leave it alone and print the difference; or there is nothing there, so add it. The end marker also means CSS you write _after_ the block is no longer swallowed — before, the region ran to the end of the file.

  `init` is unchanged in behaviour: it still only adds the block when there is none. Its prompt no longer says the file will be overwritten.

## 0.4.1

### Patch Changes

- [`9039699`](https://github.com/levish0/lily-svelte/commit/90396992a6f832e5fcda094f375902ad41f38af1) Thanks [@levish0](https://github.com/levish0)! - Widen the light-mode surface step so it matches dark mode.

  lily separates cards, dialogs and popovers from the page with colour alone — no borders — which makes the distance between `--bg` and `--bg-elevated` load-bearing rather than decorative. In light mode that step was doing the job with 2.4 L\*, less than half the 5.2 L\* the dark pair gets, so the same design read noticeably flatter in light mode and could disappear entirely on a dim screen.

  `--bg` moves from `#f8f8f8` to `#f0f0f0`, which is 5.2 L\* below `#ffffff` — the same step as `[#111111](https://github.com/levish0/lily-svelte/issues/111111)` → `#1c1c1c`. The tokens carry a comment saying the step is an invariant, for anyone remapping them onto an existing palette: equal values mean invisible surfaces.

## 0.4.0

### Minor Changes

- [`b72039f`](https://github.com/levish0/lily-svelte/commit/b72039fc0000f736ee4d5799c9d569e253b34e8e) Thanks [@levish0](https://github.com/levish0)! - Give `avatar` the image attributes it was hiding.

  `srcset`, `sizes`, `loading`, `crossorigin` and `referrerpolicy` are now props on `Avatar`, passed
  through to the underlying `<img>` — `restProps` lands on the wrapper, so there was no way to reach
  them before. `loading` was hardcoded to `lazy`, which meant the avatars above the fold always
  popped in late, and without `srcset` every avatar was soft on a 2x display. Both are worst exactly
  where avatars are most common: a list of them.

  ```svelte
  <Avatar
  	src={user.avatar}
  	srcset="{user.avatar} 1x, {user.avatar2x} 2x"
  	loading="eager"
  	alt={user.name}
  />
  ```

- [`1542941`](https://github.com/levish0/lily-svelte/commit/15429414504e53b0879a3ef1ad2ed87c22b5a287) Thanks [@levish0](https://github.com/levish0)! - Give `button` and `badge` a real weight ladder, `password` composable parts, and `select` groups.

  **Breaking:** `Button`'s variants are renamed and re-cut. `variant="default"` is now `variant="solid"`, and the old `variant="ghost"` — which carried a resting tint — is now `variant="soft"`. `ghost` is a new, quieter level. `Badge` uses the same names. Rename call sites: `default` → `solid`, `ghost` → `soft`.

  - **`button` gains a third weight** — `solid` / `soft` / `ghost`, loudest to quietest, with `destructive` outside the ladder as a meaning. `ghost` is transparent until hovered, so a row of icon buttons no longer reads as a row of filled chips.
  - **`button` gains `loading`** — shows a spinner and swallows clicks while an action is in flight. The label keeps its box so the button never resizes; it uses `aria-disabled` + `aria-busy` rather than `disabled`, so a keyboard user does not lose focus mid-action; and the spinner waits `loadingDelay` (150ms, tunable) so quick actions never flash.
  - **`button` gains an icon size scale** — `icon-sm` / `icon` / `icon-lg`, matching the `sm` / `default` / `lg` text buttons.
  - **`buttonVariants()` and `badgeVariants()` are exported** — for styling something that is not a `Button` or `Badge`, e.g. `<a class={buttonVariants({ variant: 'ghost', size: 'sm' })}>`.
  - **`badge` gains variants** — a `solid` / `soft` / `quiet` / `destructive` ladder, defaulting to `soft` (today's look). `quiet` keeps a fill rather than going transparent: a badge has no hover state to fall back on, so a fill-less pill stops reading as a status. It dims the label as well as the fill so the step stays legible. Hover treatment now only applies when the badge is a link, so a static status label no longer looks clickable.
  - **`password` exposes its parts** — `PasswordRoot` / `PasswordInput` / `PasswordToggleVisibility` / `PasswordStrength`, with `<Password />` kept as the composed happy path. Adds `result` (the full zxcvbn result, bindable out), `minScore`, and custom strength labels. Scoring is lazy, so a plain `<Password />` never pays for zxcvbn.
  - **`spinner` now draws in `currentColor`** — it was pinned to `--text`, so it disappeared on any surface painted in that colour, including the new `solid` loading button. It now inherits the text colour of wherever it is dropped.
  - **`select` gains `Group`, `GroupHeading` and `Separator`** — options can be grouped under headings once there are more than a handful.

- [`b72039f`](https://github.com/levish0/lily-svelte/commit/b72039fc0000f736ee4d5799c9d569e253b34e8e) Thanks [@levish0](https://github.com/levish0)! - Rename the project config to `lily.json`, and give `file-drop-zone` its size and accept constants.

  **Breaking:** the CLI now reads and writes `lily.json` instead of `components.json`. Running `init` on an existing lily project moves the settings across and removes the old file, so there is nothing to do by hand.

  - **`components.json` → `lily.json`** — the old name is also shadcn-svelte's, and both tools default to `$lib/components/ui`, so a project could only ever host one of them. Worse, lily could not tell its own config from shadcn's: running `init` in a shadcn project inherited that project's `registry`, failed on the first fetch, and left the user's config half-rewritten. lily now only reads a `components.json` that points at a lily registry or schema, and ignores a foreign one entirely — which also makes gradual migration possible, with shadcn staying in `$lib/components/ui` while lily is installed under a different alias.
  - **`file-drop-zone` exports `BYTE` / `KILOBYTE` / `MEGABYTE` / `GIGABYTE` and `ACCEPT_IMAGE` / `ACCEPT_VIDEO` / `ACCEPT_AUDIO`** — the natural companions to `maxFileSize` and `accept`, which every project was re-declaring. They are 1024-based, matching `displaySize` and the server limits they usually mirror (nginx's `client_max_body_size 10m` and body-parser's `'10mb'` are both 1024-based, so 1000-based constants would reject files the server would have accepted).

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
