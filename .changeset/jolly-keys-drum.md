---
'lily-svelte': minor
---

Add the Sidebar component and the Blocks registry.

- **New component: `sidebar`** — a composable app sidebar with 24 parts (Provider, Root, Trigger, Rail, Inset, Group/Menu/Sub-menu parts and more). Supports `side` (left/right), `variant` (sidebar/floating/inset) and `collapsible` (offcanvas/icon/none) modes, keyboard shortcut (Cmd/Ctrl+B), cookie state persistence, tooltips when collapsed to icons, and automatic Sheet rendering on mobile. Install with `lily-svelte add sidebar`.
- **New hook: `is-mobile`** — the first registry hook (`registry:hook`), built on `svelte/reactivity`'s `MediaQuery`.
- **New: Blocks** — ready-made full-page examples installable via the CLI (`lily-svelte add sidebar-05`): five sidebar variants (`sidebar-01`–`05`), `login-01`, `signup-01` (with password strength), `otp-01` and `calendar-01`. Browse them at `/blocks` with category tabs, a resizable full-screen iframe preview and a per-file source viewer.
- **Docs fix:** component pages no longer render the demo source twice — the highlighted code now lands inside the Preview/Code tabs (mdsx `rehypeComponentExample` raw-node split).
