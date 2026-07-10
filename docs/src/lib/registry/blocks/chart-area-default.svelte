<script lang="ts">
	import { AreaChart } from 'layerchart';
	import { curveNatural } from 'd3-shape';
	import { scaleUtc } from 'd3-scale';
	import * as Chart from '$lib/registry/ui/chart/index.js';
	import * as Card from '$lib/registry/ui/card/index.js';

	const chartData = [
		{ date: new Date('2026-01-01'), desktop: 186 },
		{ date: new Date('2026-02-01'), desktop: 305 },
		{ date: new Date('2026-03-01'), desktop: 237 },
		{ date: new Date('2026-04-01'), desktop: 73 },
		{ date: new Date('2026-05-01'), desktop: 209 },
		{ date: new Date('2026-06-01'), desktop: 214 }
	];

	const chartConfig = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Area Chart</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="w-full">
			<AreaChart
				data={chartData}
				x="date"
				xScale={scaleUtc()}
				series={[{ key: 'desktop', label: 'Desktop', color: chartConfig.desktop.color }]}
				axis="x"
				props={{
					area: {
						curve: curveNatural,
						fillOpacity: 0.4,
						line: { class: 'stroke-1' },
						motion: 'tween'
					},
					xAxis: {
						format: (v: Date) => v.toLocaleDateString('en-US', { month: 'short' })
					}
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip
						labelFormatter={(v: Date) => v.toLocaleDateString('en-US', { month: 'long' })}
						indicator="line"
					/>
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
