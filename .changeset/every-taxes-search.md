---
'lily-svelte': minor
---

Add the Chart component, chart color tokens and the /charts gallery.

- **New component: `chart`** — themed `Chart.Container` and `Chart.Tooltip` wrappers for [LayerChart](https://layerchart.com) (v2), so any LayerChart chart drops into a lily project. Install with `lily-svelte add chart`.
- **New tokens: `--chart-1` … `--chart-5`** — a 5-color chart palette (with dark-mode variants) added to `lily/tailwind.css`, the one sanctioned color surface in the otherwise monochrome system. Override the variables to theme every chart at once.
- **New: chart blocks & /charts gallery** — 12 ready-made charts across area, bar, line, pie, radar, radial and tooltip categories, browsable at `/charts/[type]` with per-chart source viewer (Sheet on desktop, Drawer on mobile) and installable via the CLI (e.g. `lily-svelte add chart-area-stacked`).
- **Blocks improvements** — the login block's password field now uses the `Password` component (show/hide toggle), small screens render the live block preview instead of a link, and the preview resize handle now matches the intended subtle pill style.
