---
title: Dark Mode
description: lily ships light and dark themes out of the box via a class on the html element.
---

lily ships both light and dark themes. Dark mode is driven by a `.dark` class on the `<html>` element: the base stylesheet defines the light tokens on `:root` and overrides them under `:root.dark`. Add or remove that class and every component re-themes automatically.

## Using mode-watcher

The easiest way to manage the class (with system-preference detection and no flash on load) is [mode-watcher](https://github.com/svecosystem/mode-watcher).

```bash
npm install mode-watcher
```

Render `<ModeWatcher />` once near the root of your app, then call `toggleMode` to switch themes.

```svelte
<script lang="ts">
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
</script>

<ModeWatcher />

<Button variant="ghost" onclick={toggleMode}>Toggle theme</Button>
```

`ModeWatcher` keeps the `.dark` class on `<html>` in sync with the user's choice and persists it across reloads, so the lily tokens defined under `:root.dark` take effect everywhere.
