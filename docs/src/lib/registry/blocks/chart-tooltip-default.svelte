<script lang="ts">
	import { scaleBand } from 'd3-scale';
	import { BarChart } from 'layerchart';
	import { cubicInOut } from 'svelte/easing';
	import * as Chart from '$lib/registry/ui/chart/index.js';
	import * as Card from '$lib/registry/ui/card/index.js';

	const chartData = [
		{ date: '2026-07-15', running: 450, swimming: 300 },
		{ date: '2026-07-16', running: 380, swimming: 420 },
		{ date: '2026-07-17', running: 520, swimming: 120 },
		{ date: '2026-07-18', running: 140, swimming: 550 },
		{ date: '2026-07-19', running: 600, swimming: 350 },
		{ date: '2026-07-20', running: 480, swimming: 400 }
	];

	const chartConfig = {
		running: { label: 'Running', color: 'var(--chart-1)' },
		swimming: { label: 'Swimming', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Tooltip - Default</Card.Title>
		<Card.Description>Default tooltip with Chart.Tooltip.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="w-full">
			<BarChart
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				x="date"
				axis="x"
				rule={false}
				series={[
					{
						key: 'running',
						label: 'Running',
						color: chartConfig.running.color,
						props: { rounded: 'bottom' }
					},
					{ key: 'swimming', label: 'Swimming', color: chartConfig.swimming.color }
				]}
				seriesLayout="stack"
				grid={false}
				highlight={false}
				props={{
					bars: {
						stroke: 'none',
						motion: { type: 'tween', duration: 500, easing: cubicInOut }
					},
					xAxis: {
						format: (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'short' })
					}
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
