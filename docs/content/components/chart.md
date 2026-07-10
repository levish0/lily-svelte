---
title: Chart
description: Beautiful charts built with LayerChart. Copy and paste into your apps.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/chart
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="chart-demo">
<div></div>
</ComponentPreview>

Charts are built with [LayerChart](https://layerchart.com) — lily only ships the themed
`Chart.Container` and `Chart.Tooltip` wrappers plus a 5-color palette, so any LayerChart
chart works.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="chart" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Install <code>layerchart</code>.</Step>

```bash
npm i layerchart
```

<Step>Copy the chart source from the registry into <code>$lib/components/ui/chart</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Colors

Charts use the `--chart-1` … `--chart-5` CSS variables — the one sanctioned color surface
in lily's otherwise monochrome system. Override them in your stylesheet to theme every
chart at once:

```css
:root {
	--chart-1: #3182f6;
	--chart-2: #10b981;
	--chart-3: #f59e0b;
	--chart-4: #8b5cf6;
	--chart-5: #f43f5e;
}
```

Reference them in your chart config with `var(--chart-N)`:

```svelte
<script lang="ts">
	import * as Chart from '$lib/components/ui/chart';

	const chartConfig = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' },
		mobile: { label: 'Mobile', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;
</script>
```

## Bar Chart

<ComponentPreview name="chart-bar-demo">
<div></div>
</ComponentPreview>

## Pie Chart

<ComponentPreview name="chart-pie-demo">
<div></div>
</ComponentPreview>
