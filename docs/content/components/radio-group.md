---
title: Radio Group
description: A set of checkable buttons where only one can be selected at a time.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/radio-group
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="radio-group-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="radio-group" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the radio-group source from the registry into <code>$lib/components/ui/radio-group</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
</script>

<RadioGroup value="comfortable">
	<div class="flex items-center gap-3">
		<RadioGroupItem value="default" id="r1" />
		<Label for="r1">Default</Label>
	</div>
	<div class="flex items-center gap-3">
		<RadioGroupItem value="comfortable" id="r2" />
		<Label for="r2">Comfortable</Label>
	</div>
</RadioGroup>
```
