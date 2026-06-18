---
title: Calendar
description: A date-field calendar for selecting dates.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/calendar
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="calendar-demo">
<div></div>
</ComponentPreview>

Built on [bits-ui](https://bits-ui.com) + [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/) for locale-aware, timezone-safe dates.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="calendar" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Add the date dependency, then copy the source into <code>$lib/components/ui/calendar</code>.</Step>

```bash
npm install @internationalized/date
```

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Calendar } from "$lib/components/ui/calendar";
	import { today, getLocalTimeZone } from "@internationalized/date";

	let value = $state(today(getLocalTimeZone()));
</script>

<Calendar type="single" bind:value />
```
