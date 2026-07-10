<script lang="ts">
	import { cn } from '$lib/utils.js';
	import ChartToolbar from './chart-toolbar.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { HighlightedBlock } from '../../routes/api/block/[block]/+server.js';

	let {
		chart,
		class: className,
		children
	}: HTMLAttributes<HTMLDivElement> & { chart: HighlightedBlock } = $props();
</script>

<div
	class={cn(
		'group relative flex flex-col overflow-hidden rounded-3xl border border-(--text)/8 bg-(--bg-elevated)',
		className
	)}
>
	<ChartToolbar {chart} class="relative z-20 border-b border-(--text)/8 px-3 py-2.5">
		{@render children?.()}
	</ChartToolbar>
	<div
		class="relative z-10 flex flex-1 items-center [&>div]:w-full [&>div]:rounded-none [&>div]:shadow-none"
	>
		{@render children?.()}
	</div>
</div>
