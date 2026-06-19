---
title: Installation
description: Set up lily in your SvelteKit project and add your first component.
---

<script>
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

lily is a copy-and-own component library: the CLI scaffolds the design tokens and drops component source directly into your project, so you own and can edit every file.

<Steps>

<Step>Initialize lily in your project.</Step>

Run the init command once per project. It creates a `components.json` file, wires up the `cn` utility, and adds the lily design tokens to your global stylesheet via `@import "lily/tailwind.css"`.

```bash
npx lily-svelte@latest init
```

<Step>Add components.</Step>

Add any component with the `add` command. The source is copied into `$lib/components/ui/<name>` so you can read and customize it.

```bash
npx lily-svelte@latest add button
```

You can add several at once:

```bash
npx lily-svelte@latest add card badge avatar
```

<Step>Use the component.</Step>

Import it from your local `ui` directory and start building.

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<Button>Click me</Button>
```

</Steps>

## components.json

`components.json` records your project settings (aliases and the path lily writes components to) so the CLI knows where to place new files on every `add`. You normally do not need to edit it by hand.

## Design tokens

The lily aesthetic comes from a small set of CSS variables (such as `--text`, `--bg`, and `--bg-elevated`) imported through `@import "lily/tailwind.css"`. Components reference them with Tailwind's arbitrary-value syntax, like `text-(--text)/72` and `bg-(--bg-elevated)`, so theming stays consistent across every component.
