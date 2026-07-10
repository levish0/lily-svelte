<script lang="ts">
	import { scaleBand } from 'd3-scale';
	import { BarChart } from 'layerchart';
	import { cubicInOut } from 'svelte/easing';
	import * as Chart from '$lib/registry/ui/chart/index.js';
	import * as Card from '$lib/registry/ui/card/index.js';

	const chartData = [
		{ month: 'January', desktop: 186, mobile: 80 },
		{ month: 'February', desktop: 305, mobile: 200 },
		{ month: 'March', desktop: 237, mobile: 120 },
		{ month: 'April', desktop: 73, mobile: 190 },
		{ month: 'May', desktop: 209, mobile: 130 },
		{ month: 'June', desktop: 214, mobile: 140 }
	];

	const chartConfig = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' },
		mobile: { label: 'Mobile', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Bar Chart - Multiple</Card.Title>
		<Card.Description>January - June 2026</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="w-full">
			<BarChart
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				x="month"
				axis="x"
				seriesLayout="group"
				legend
				series={[
					{ key: 'desktop', label: 'Desktop', color: chartConfig.desktop.color },
					{ key: 'mobile', label: 'Mobile', color: chartConfig.mobile.color }
				]}
				props={{
					bars: {
						stroke: 'none',
						rounded: 'all',
						radius: 8,
						motion: { type: 'tween', duration: 500, easing: cubicInOut }
					},
					highlight: { area: { fill: 'none' } },
					xAxis: { format: (d: string) => d.slice(0, 3) }
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
