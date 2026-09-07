# Preview surfaces and component naming

## Scope

Supersedes home composition and spacing statements in earlier September 7 notes.

## Changes

- BottomCta / bottom-cta renamed to ActionFooter / action-footer; SegmentedControl / segmented-control renamed to ChoiceGroup / choice-group. Imports, files, docs URLs, registry dependencies and examples use the new names. No legacy aliases.
- Design Styles public page and navigation removed at user request. Research/coverage retained internally, not served in docs/content. Public examples and component documentation contain no external brand mentions.
- All new example and Workshop block copy is English.
- Diamond Top padding is 16px, ActionFooter horizontal/bottom padding 16px; ListRow horizontal 16px and default vertical 10px. Aquamarine maps keep independent values.
- ActionFooter example uses independent elevated screens, 280px minimum in Diamond and 360px in Aquamarine. The dark stage uses page background, so the screens do not merge into one filled panel. Existing shared preview defaults remain unchanged; these new composition docs use a compact outer inset.
- Rich Workshop composition moved from home/repeated component demos to blocks/workshop-01; Top and ListRow have focused examples.
- Generated styles remove stale files and empty directories, registry builder removes obsolete per-item JSON after successful build.
- Preview route marks client mount separately from the server-rendered style attribute, for reliable interaction verification.

## Validation

- svelte-check: 0 errors, 0 warnings after naming/spacing/translation.
- E2E: 11/13 passed initial run; cold hydration timeout and premature preview click were diagnosed, both failed cases then passed rerun.
- Style registry tests: 6 passed, 1 baseline comparison skipped.
- Svelte autofixer: no issues; public bind:ref primitives retain bind:this despite generic suggestion.
- Actual Diamond dark ActionFooter screenshot confirms two separate cards. Both styles checked for distinct surfaces and separate padding.
- Whole TDS catalog parity remains incomplete; see internal coverage note. No push or deployment. Earlier signed commit attempt failed at GPG pinentry; changes remain uncommitted.
