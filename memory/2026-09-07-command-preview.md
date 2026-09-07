# Command preview and keyboard selection

## Changes

- Component preview iframes observe their same-origin preview main element with ResizeObserver and follow its content height. Embedded preview routes use a content-independent minimum height to allow shrinking after filtering; standalone/block previews retain their viewport minimum.
- Command already delegates arrow keys, Enter, filtering, and IME handling to Bits UI. The example now enables looping and connects item onSelect callbacks to a visible status. Do not introduce a second keyboard controller.
- Native HTML remains appropriate inside Lily primitives; docs and example controls consume Lily components.

## Validation

- Registry generation passed for Diamond and Topaz.
- Four Playwright tests passed against the local Vite server: both styles at 1280px and 390px, filtered arrow navigation, Enter, retained input focus, looping, no-results handling, pointer selection, and no outer Topaz iframe overflow.
- Tests wait for the initial selected option before typing so SSR markup is hydrated.
- Svelte check passed with zero errors and warnings. Command preview screenshot inspected.
- Full production build and full test suite were not run for this change. The wider Diamond/Topaz implementation remains incomplete and uncommitted; this milestone does not establish complete TDS coverage.
- GPG signing was blocked in the preceding commit attempt. Signing configuration has not been bypassed or changed.
