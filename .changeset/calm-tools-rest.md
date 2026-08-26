---
'lily-svelte': minor
---

Remove the unused icon-library and menu-style configuration fields and their public transformer exports. Lily now uses its single built-in icon and menu design without configurable alternatives. Also prevent the password strength reader from recursively updating so strength feedback renders normally.
