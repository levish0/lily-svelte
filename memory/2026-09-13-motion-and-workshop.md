# Aquamarine motion and Workshop layout

## Changes

- Restore the shared spring easing and missing interaction transitions in Aquamarine Button, Badge, Dialog, NumberField, and segmented Tabs. Dialog regains zoom-in/out; reduced-motion rules remain intact. Animated links keep Diamond's existing dedicated easing.
- Workshop explicitly fills the navigation width with equal-width tabs. Its Diamond tab wrapper uses 16px top/side padding; Aquamarine keeps its edge-aligned underline tabs. The block grid has explicit 24px side padding in both styles. Shared Diamond component defaults are unchanged.
- Added a patch changeset and motion regression checks.

## Validation

Registry generation passed. Style tests: 9 passed, 1 optional baseline comparison skipped. Browser checks at 390px and 1280px passed in both styles: equal tab widths, expected insets, 24px grid padding, working tab switching, and no horizontal overflow. Diamond mobile screenshot visually reviewed. Svelte autofixer reported no issues. Full build and broad E2E were not repeated.
