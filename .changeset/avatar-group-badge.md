---
'lily-svelte': patch
---

Add avatar groups, initials fallback and status badges.

- **New parts: `AvatarGroup` / `AvatarGroupCount`** — overlapping avatar stacks with `spacing` (tight/default/loose) and a `+N` counter. The ring that separates stacked avatars reads from `--avatar-ring`, which defaults to the page background and can be repointed at `--bg-elevated` inside cards, dialogs and popovers.
- **New part: `AvatarBadge`** — a status dot pinned to the avatar that scales with the parent's `size`, and hides any glyph at `xs`/`sm` where there is no room for one.
- **`Avatar` gains `fallback`** — a string for initials or a snippet for custom content, still falling back to the placeholder icon when omitted. A changed `src` now retries after a previous load failure instead of staying on the fallback.
