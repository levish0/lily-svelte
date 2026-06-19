---
title: Spinner
description: A monochrome loading indicator that spins.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/spinner
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="spinner-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="spinner" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the spinner source from the registry into <code>$lib/components/ui/spinner</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

Size and stroke are controlled with utility classes — `size-*` for the diameter and `border-*` for the stroke width.

```svelte
<script lang="ts">
	import { Spinner } from '$lib/components/ui/spinner';
</script>

<Spinner class="size-6" />
```
