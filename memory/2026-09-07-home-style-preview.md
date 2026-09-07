# Home showcase style selection

## Changes

- Home content is now the shared registry example `home-showcase.svelte`. Registry generation resolves its component imports for each style. Home renders Diamond directly and other styles through an auto-sized isolated preview, matching component docs.
- Full-layout embedded previews remove the example padding. Home navigation links target the parent document.
- Preview routes provide Tooltip context and apply the requested light/dark mode. Component preview iframes inherit the rounded container radius.
- ResizeObserver writes are deferred to animation frames to avoid observer delivery-loop warnings.

## Validation

- Registry generation passed with 175 items per style.
- Six Playwright cases passed on the local Vite server, covering the previous Command interactions, home style switching with actual component dimensions, form input, navigation/persistence, and rounded previews in dark mode.
- Alert and home screenshots inspected. Production build and full suite not run. Full TDS coverage remains incomplete.
- Existing GPG signing blocker remains; no signing bypass or remote publication performed.
