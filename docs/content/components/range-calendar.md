---
title: Range Calendar
description: A calendar for selecting a start and end date.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/range-calendar
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="range-calendar-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="range-calendar" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base, the dependency, and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
npm install @internationalized/date
```

<Step>Copy the range-calendar source from the registry into <code>$lib/components/ui/range-calendar</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>
