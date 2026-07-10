<script lang="ts">
	import { LineChart } from 'layerchart';
	import { scaleUtc } from 'd3-scale';
	import { curveNatural } from 'd3-shape';
	import * as Chart from '$lib/registry/ui/chart/index.js';
	import * as Card from '$lib/registry/ui/card/index.js';

	const chartData = [
		{ date: new Date('2026-01-01'), desktop: 186, mobile: 80 },
		{ date: new Date('2026-02-01'), desktop: 305, mobile: 200 },
		{ date: new Date('2026-03-01'), desktop: 237, mobile: 120 },
		{ date: new Date('2026-04-01'), desktop: 73, mobile: 190 },
		{ date: new Date('2026-05-01'), desktop: 209, mobile: 130 },
		{ date: new Date('2026-06-01'), desktop: 214, mobile: 140 }
	];

	const chartConfig = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' },
		mobile: { label: 'Mobile', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Line Chart - Multiple</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="w-full">
			<LineChart
				data={chartData}
				x="date"
				xScale={scaleUtc()}
				axis="x"
				series={[
					{ key: 'desktop', label: 'Desktop', color: chartConfig.desktop.color },
					{ key: 'mobile', label: 'Mobile', color: chartConfig.mobile.color }
				]}
				props={{
					spline: { curve: curveNatural, motion: 'tween', strokeWidth: 2 },
					xAxis: {
						format: (v: Date) => v.toLocaleDateString('en-US', { month: 'short' })
					},
					highlight: { points: { r: 4 } }
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</LineChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
