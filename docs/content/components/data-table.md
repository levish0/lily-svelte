---
title: Data Table
description: A sortable table powered by TanStack Table, styled with the lily table primitives.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/data-table
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="data-table-demo">
<div></div>
</ComponentPreview>

The data table is a composition: it pairs the [Table](/docs/components/table) primitives with
[`@tanstack/table-core`](https://tanstack.com/table) for sorting, filtering, and pagination. Click a
column header to sort.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="data-table" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base, the `table` component, and the dependency.</Step>

```bash
npx lily init
npx lily add table
npm install @tanstack/table-core
```

<Step>Copy the data-table adapter from the registry into <code>$lib/components/ui/data-table</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>
