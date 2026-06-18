---
title: Select
description: A dropdown for choosing a single value from a list.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/select
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="select-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="select" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the select source from the registry into <code>$lib/components/ui/select</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Select, SelectTrigger, SelectContent, SelectItem } from '$lib/components/ui/select';

	let value = $state('');
</script>

<Select type="single" bind:value>
	<SelectTrigger>{value || 'Select a fruit'}</SelectTrigger>
	<SelectContent>
		<SelectItem value="Apple">Apple</SelectItem>
		<SelectItem value="Banana">Banana</SelectItem>
	</SelectContent>
</Select>
```
