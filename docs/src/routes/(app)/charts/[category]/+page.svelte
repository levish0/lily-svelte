<script lang="ts">
	import type { PageProps } from './$types.js';
	import ChartDisplay from '$lib/components/chart-display.svelte';

	let { data }: PageProps = $props();
</script>

<div class="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
	{#each data.charts as chart (chart.name)}
		<ChartDisplay {chart}>
			<chart.component />
		</ChartDisplay>
	{/each}
</div>
