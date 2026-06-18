---
title: Separator
description: A thin divider for splitting content horizontally or vertically.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/separator
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="separator-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="separator" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the separator source from the registry into <code>$lib/components/ui/separator</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
</script>

<Separator />
```

## Vertical

Set `orientation="vertical"` inside a flex row. The separator stretches to the row height, so give the row a height.

```svelte
<div class="flex h-5 items-center gap-4">
	<span>Docs</span>
	<Separator orientation="vertical" />
	<span>Components</span>
</div>
```
