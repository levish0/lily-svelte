---
title: Aspect Ratio
description: Constrains content to a fixed width-to-height ratio.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/aspect-ratio
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="aspect-ratio-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="aspect-ratio" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the aspect-ratio source from the registry into <code>$lib/components/ui/aspect-ratio</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
</script>

<AspectRatio ratio={16 / 9}>
	<img src="/cover.jpg" alt="Cover" class="size-full rounded-3xl object-cover" />
</AspectRatio>
```
