---
title: Tooltip
description: A floating label that appears on hover or focus.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/tooltip
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="tooltip-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="tooltip" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the tooltip source from the registry into <code>$lib/components/ui/tooltip</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

Wrap your app (or the relevant subtree) in `Tooltip.Provider`, then pair a `Tooltip.Trigger` with `Tooltip.Content`.

```svelte
<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>Hover me</Tooltip.Trigger>
		<Tooltip.Content>Add to library</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
```

## With a Button trigger

Use the `child` snippet to render your own element (like a `Button`) as the trigger. Spread `props` so the tooltip wiring is preserved.

```svelte
<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button variant="ghost" {...props}>Hover me</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>Add to library</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
```
