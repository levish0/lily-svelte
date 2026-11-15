---
'lily-svelte': patch
---

Apply `overrideDependencies` to dependencies carried as peers in `lily-svelte registry build`, so a package pulled in through another package's peers publishes the overridden range instead of the project's installed version.
