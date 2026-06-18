---
title: Input
description: A form input field styled with the lily token set.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/input
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="input-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="input" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the input source from the registry into <code>$lib/components/ui/input</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Input } from "$lib/components/ui/input";
</script>

<Input type="email" placeholder="you@levish.ac" />
```

## With a label

```svelte
<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
</script>

<div class="flex flex-col gap-2">
	<Label for="email">Email</Label>
	<Input id="email" type="email" placeholder="you@levish.ac" />
</div>
```

## Disabled

```svelte
<Input placeholder="Disabled" disabled />
```
