---
title: Date Picker
description: A date input that opens a calendar in a popover.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/date-picker
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="date-picker-demo">
<div></div>
</ComponentPreview>

Composes [Popover](/docs/components/popover) + [Calendar](/docs/components/calendar).

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="date-picker" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Add `popover`, `calendar`, and the date dependency, then copy the source into <code>$lib/components/ui/date-picker</code>.</Step>

```bash
npx lily add popover calendar
npm install @internationalized/date
```

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { DatePicker } from '$lib/components/ui/date-picker';
	import type { DateValue } from '@internationalized/date';

	let value = $state<DateValue | undefined>(undefined);
</script>

<DatePicker bind:value />
```
