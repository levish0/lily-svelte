<script lang="ts">
	import { ArcChart, Text } from 'layerchart';
	import * as Chart from '$lib/registry/ui/chart/index.js';
	import * as Card from '$lib/registry/ui/card/index.js';

	const chartData = [{ browser: 'safari', visitors: 200, color: 'var(--color-safari)' }];

	const chartConfig = {
		visitors: { label: 'Visitors' },
		safari: { label: 'Safari', color: 'var(--chart-1)' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full">
	<Card.Header class="items-center">
		<Card.Title>Radial Chart - Text</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="mx-auto aspect-square w-full max-w-[250px]">
			<ArcChart
				label="browser"
				value="visitors"
				outerRadius={-20}
				innerRadius={-12}
				padding={40}
				range={[90, -270]}
				maxValue={300}
				cornerRadius={20}
				series={chartData.map((d) => ({
					key: d.browser,
					color: d.color,
					data: [d]
				}))}
				props={{
					arc: {
						track: { fill: 'color-mix(in srgb, var(--text) 8%, transparent)' },
						motion: 'tween'
					},
					tooltip: { context: { hideDelay: 350 } }
				}}
				tooltipContext={false}
			>
				{#snippet aboveMarks()}
					<Text
						value={String(chartData[0]!.visitors)}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-(--text) text-4xl! font-bold"
						dy={3}
					/>
					<Text
						value="Visitors"
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-(--text)/56!"
						dy={22}
					/>
				{/snippet}
			</ArcChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
