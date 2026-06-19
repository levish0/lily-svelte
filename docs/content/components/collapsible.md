---
title: Collapsible
description: An interactive section that expands and collapses.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/collapsible
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="collapsible-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="collapsible" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the collapsible source from the registry into <code>$lib/components/ui/collapsible</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import {
		Collapsible,
		CollapsibleTrigger,
		CollapsibleContent
	} from '$lib/components/ui/collapsible';
</script>

<Collapsible>
	<CollapsibleTrigger>Toggle</CollapsibleTrigger>
	<CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
```
