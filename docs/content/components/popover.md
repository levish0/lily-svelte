---
title: Popover
description: Rich floating content anchored to a trigger.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/popover
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="popover-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="popover" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the popover source from the registry into <code>$lib/components/ui/popover</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
</script>

<Popover>
	<PopoverTrigger>
		{#snippet child({ props })}
			<Button variant="ghost" {...props}>Open</Button>
		{/snippet}
	</PopoverTrigger>
	<PopoverContent>Place content here.</PopoverContent>
</Popover>
```
