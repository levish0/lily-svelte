---
title: Sonner
description: An opinionated toast notification, powered by svelte-sonner.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/sonner
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="sonner-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="sonner" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Add the `svelte-sonner` dependency and copy the source into <code>$lib/components/ui/sonner</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

Add the `Toaster` to your root layout once:

```svelte
<script lang="ts">
	import { Toaster } from "$lib/components/ui/sonner";
</script>

<Toaster />
```

Then trigger toasts from anywhere:

```svelte
<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/components/ui/button";
</script>

<Button onclick={() => toast("Event created")}>Show toast</Button>
```
