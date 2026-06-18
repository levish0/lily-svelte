---
title: Button Group
description: Joins related buttons into a single segmented control.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/button-group
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="button-group-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="button-group" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the button-group source from the registry into <code>$lib/components/ui/button-group</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { ButtonGroup, ButtonGroupSeparator } from '$lib/components/ui/button-group';
	import { Button } from '$lib/components/ui/button';
</script>

<ButtonGroup>
	<Button variant="ghost">Day</Button>
	<ButtonGroupSeparator />
	<Button variant="ghost">Week</Button>
	<ButtonGroupSeparator />
	<Button variant="ghost">Month</Button>
</ButtonGroup>
```
