---
title: Hover Card
description: A card of preview content shown on hover.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/hover-card
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="hover-card-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="hover-card" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the hover-card source from the registry into <code>$lib/components/ui/hover-card</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '$lib/components/ui/hover-card';
</script>

<HoverCard>
	<HoverCardTrigger href="https://levish.ac">@levish</HoverCardTrigger>
	<HoverCardContent>Preview content</HoverCardContent>
</HoverCard>
```
