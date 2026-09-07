# Topaz card hierarchy

## Decision and changes

- User references emphasize white pages with soft gray tiles, visible surface grouping, and borderless controls. Do not interpret white-on-white invisible cards as a verified TDS rule.
- Topaz light page remains white. Card uses --surface-card (#f9fafb); controls inside Card inherit --surface-muted from --surface-inset (#f2f4f6). Overlay --bg-elevated stays white. Dark mode preserves #24272c cards and #202327 inset controls.
- This is an intentional Lily composition decision, documented separately from measured TDS specifications. No supplied artwork or embedded asset instructions were imported.
- Home column breakpoints allow more space per card; the nested calendar removes its duplicate background/padding.
- Fixed the CLI build config's source import to .ts for Node's native TypeScript config loader.

## Validation

- CLI/package build passed. Registry build passed after retrying transient Windows schema.json file-open contention.
- Browser computed styles confirmed distinct page/card/field colors in light and dark, with no card border/shadow. Screenshot inspected; Svelte autofixer passed for the changed showcase.
- Full production docs build and full tests not rerun for this surface adjustment. Wider TDS component coverage remains incomplete.
