---
'lily-svelte': minor
---

Give `button` and `badge` a real weight ladder, `password` composable parts, and `select` groups.

**Breaking:** `Button`'s variants are renamed and re-cut. `variant="default"` is now `variant="solid"`, and the old `variant="ghost"` — which carried a resting tint — is now `variant="soft"`. `ghost` is a new, quieter level. `Badge` uses the same names. Rename call sites: `default` → `solid`, `ghost` → `soft`.

- **`button` gains a third weight** — `solid` / `soft` / `ghost`, loudest to quietest, with `destructive` outside the ladder as a meaning. `ghost` is transparent until hovered, so a row of icon buttons no longer reads as a row of filled chips.
- **`button` gains `loading`** — shows a spinner and swallows clicks while an action is in flight. The label keeps its box so the button never resizes; it uses `aria-disabled` + `aria-busy` rather than `disabled`, so a keyboard user does not lose focus mid-action; and the spinner waits `loadingDelay` (150ms, tunable) so quick actions never flash.
- **`button` gains an icon size scale** — `icon-sm` / `icon` / `icon-lg`, matching the `sm` / `default` / `lg` text buttons.
- **`buttonVariants()` and `badgeVariants()` are exported** — for styling something that is not a `Button` or `Badge`, e.g. `<a class={buttonVariants({ variant: 'ghost', size: 'sm' })}>`.
- **`badge` gains variants** — the same `solid` / `soft` / `ghost` / `destructive` ladder, defaulting to `soft` (today's look). Hover treatment now only applies when the badge is a link, so a static status label no longer looks clickable.
- **`password` exposes its parts** — `PasswordRoot` / `PasswordInput` / `PasswordToggleVisibility` / `PasswordStrength`, with `<Password />` kept as the composed happy path. Adds `result` (the full zxcvbn result, bindable out), `minScore`, and custom strength labels. Scoring is lazy, so a plain `<Password />` never pays for zxcvbn.
- **`spinner` now draws in `currentColor`** — it was pinned to `--text`, so it disappeared on any surface painted in that colour, including the new `solid` loading button. It now inherits the text colour of wherever it is dropped.
- **`select` gains `Group`, `GroupHeading` and `Separator`** — options can be grouped under headings once there are more than a handful.
