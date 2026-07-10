<script lang="ts">
	import { LineChart } from 'layerchart';
	import { curveLinearClosed } from 'd3-shape';
	import { scaleBand } from 'd3-scale';
	import * as Chart from '$lib/registry/ui/chart/index.js';
	import * as Card from '$lib/registry/ui/card/index.js';

	const chartData = [
		{ month: 'January', desktop: 186 },
		{ month: 'February', desktop: 305 },
		{ month: 'March', desktop: 237 },
		{ month: 'April', desktop: 273 },
		{ month: 'May', desktop: 209 },
		{ month: 'June', desktop: 214 }
	];

	const chartConfig = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full">
	<Card.Header class="items-center">
		<Card.Title>Radar Chart</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="mx-auto aspect-square w-full max-w-[250px]">
			<LineChart
				data={chartData}
				series={[{ key: 'desktop', label: 'Desktop', color: chartConfig.desktop.color }]}
				radial
				x="month"
				xScale={scaleBand()}
				padding={12}
				props={{
					spline: {
						curve: curveLinearClosed,
						fill: 'var(--color-desktop)',
						fillOpacity: 0.6,
						stroke: '0',
						motion: 'tween'
					},
					xAxis: { tickLength: 0 },
					yAxis: { format: () => '' },
					grid: { radialY: 'linear' },
					tooltip: { context: { mode: 'voronoi' } },
					highlight: { lines: false }
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip />
				{/snippet}
			</LineChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
