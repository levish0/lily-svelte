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
npx lily-svelte@latest init
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

## Groups

Once a select holds more than a handful of options, group them under headings. `SelectSeparator`
draws a rule between groups.

<ComponentPreview name="select-group-demo">
<div></div>
</ComponentPreview>

```svelte
<SelectContent>
	<SelectGroup>
		<SelectGroupHeading>Asia</SelectGroupHeading>
		<SelectItem value="Seoul">Seoul</SelectItem>
		<SelectItem value="Tokyo">Tokyo</SelectItem>
	</SelectGroup>
	<SelectSeparator />
	<SelectGroup>
		<SelectGroupHeading>Europe</SelectGroupHeading>
		<SelectItem value="London">London</SelectItem>
	</SelectGroup>
</SelectContent>
```

`SelectGroupHeading` is a label, not an option — it is skipped by keyboard navigation and
announced as the group's name for the items under it.
