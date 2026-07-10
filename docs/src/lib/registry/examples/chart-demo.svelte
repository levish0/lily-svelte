<script lang="ts">
	import Icon from '@iconify/svelte';
	import { AreaChart } from 'layerchart';
	import { curveNatural } from 'd3-shape';
	import { scaleUtc } from 'd3-scale';
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

<Card.Root class="w-full max-w-lg">
	<Card.Header>
		<Card.Title>Area Chart</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<AreaChart
				data={chartData}
				x="date"
				xScale={scaleUtc()}
				series={[
					{ key: 'mobile', label: 'Mobile', color: chartConfig.mobile.color },
					{ key: 'desktop', label: 'Desktop', color: chartConfig.desktop.color }
				]}
				seriesLayout="stack"
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
						indicator="dot"
					/>
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<div class="flex items-center gap-2 leading-none font-medium">
					Trending up by 5.2% this month
					<Icon icon="heroicons:arrow-trending-up-solid" class="size-4" aria-hidden="true" />
				</div>
				<div class="flex items-center gap-2 leading-none text-(--text)/56">January - June 2026</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
