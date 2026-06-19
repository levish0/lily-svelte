---
'lily-svelte': patch
---

init: write the full lily design system straight into the user's stylesheet — so they own and can edit every token — instead of `@import "lily/tailwind.css"`, which pointed at a package that doesn't exist and broke `lily-svelte init` with "Can't resolve 'lily/tailwind.css'".
