# Aquamarine site controls and preview geometry

## Current state

- The active style is now named Aquamarine in CLI, registry and docs. Diamond remains the default. Earlier Topaz notes describe historical naming.
- Docs now resolve shared component presentation slots using a generated style lookup, so the header, search dialog, home showcase and inline component previews change together. Installed source still contains static selected-style classes and plain cn utilities; it does not depend on the docs runtime.
- Compact panel choices use Tabs variant=segmented. Package-manager selection uses the new radio-based SegmentedControl. Public navigation Tabs remain distinct.
- Badge now has size and color APIs from the official component measurements. GridList was added. These additions do not establish full TDS component coverage; the user's full catalog request remains unfinished.

## Latest corrections

- Icon-only docs Button consumers explicitly use icon-sm. A size-7 class alone did not remove Aquamarine default min-width 64px / min-height 38px. Chart and code copy buttons now measure 28 by 28 pixels; header icon actions also avoid text-button minimum width.
- Aquamarine SelectTrigger now uses height 38px / radius 10px, matching the header search Button. This is a Lily extension design decision, not an asserted Figma Select specification. Diamond classes are unchanged.
- Block iframe URLs request layout=full. That route now renders a normal full-width wrapper without component-preview padding, flex centering or viewport minimum height. Blocks retain their own layout and intentional content scrolling.
- GridList media snippet omits the HTML anchor media attribute from ButtonProps to avoid a string/snippet type intersection. Dark grid fill corrected to the observed adaptive opacity token.

## Validation

- Registry generation succeeded (180 items per style). svelte-check: 0 errors, 0 warnings.
- Browser: Aquamarine header controls both 38px high with 10px radius; chart copy 28px square before/after hover.
- Featured desktop blocks sidebar-05, login-01, signup-01: document scroll size equals iframe viewport (1330x930, 1330x870, 1330x870). This is not an assertion that all narrow/mobile block content fits without scrolling.
- Nine targeted Playwright cases: seven passed initially; two existing initial-selection checks timed out, then both passed on rerun. Initial-state flakiness is not resolved.
- Svelte autofixer found no issues in latest changed components; existing chart-toolbar DOM-derived code effect has a non-blocking derived-state suggestion.
- No push/deploy. Earlier signed commit attempt was blocked by GPG pinentry; signing configuration has not been bypassed.

## Remaining

- Complete the full TDS component/API/state mapping and substantive missing components. Official-doc measurements and 57-page reference corpus are currently in D:/tmp/lily-topaz-extract, not a durable coverage report.
- Do not call Aquamarine complete. Earlier broad class maps still require per-component review and visual comparisons.
