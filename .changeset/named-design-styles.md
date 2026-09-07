---
'lily-svelte': minor
---

Add project-level Diamond and Aquamarine design styles. `init --style` saves the selection in `lily.json`, and subsequent component installation and updates resolve the matching registry, dependencies, and CSS. Existing configurations without a style continue to use Diamond.

Protect existing projects from config-only style switches and accidental replacement of customized CSS. Changing styles requires reviewing and migrating installed sources and styles together.

Add Action Footer, Choice Group, Grid List, List Row, Search Field, and Top components, plus the Workshop block. Extend button, input, and tab variants; improve Command keyboard navigation; and support custom File Drop Zone triggers composed with Lily Button.

Keep documentation controls, previews, displayed source, and installation instructions aligned with the selected style. Fix preview overflow, per-example backgrounds, mobile navigation, and presentation extraction after class formatting.
