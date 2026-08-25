---
'lily-svelte': patch
---

Widen the light-mode surface step so it matches dark mode.

lily separates cards, dialogs and popovers from the page with colour alone — no borders — which makes the distance between `--bg` and `--bg-elevated` load-bearing rather than decorative. In light mode that step was doing the job with 2.4 L\*, less than half the 5.2 L\* the dark pair gets, so the same design read noticeably flatter in light mode and could disappear entirely on a dim screen.

`--bg` moves from `#f8f8f8` to `#f0f0f0`, which is 5.2 L\* below `#ffffff` — the same step as `#111111` → `#1c1c1c`. The tokens carry a comment saying the step is an invariant, for anyone remapping them onto an existing palette: equal values mean invisible surfaces.
