<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils.js';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import { Separator } from '$lib/registry/ui/separator/index.js';
	import ChartCodeViewer from './chart-code-viewer.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { HighlightedBlock } from '../../routes/api/block/[block]/+server.js';

	let {
		chart,
		class: className,
		children
	}: HTMLAttributes<HTMLDivElement> & { chart: HighlightedBlock } = $props();

	const clipboard = new UseClipboard();

	let code = $state('');

	$effect(() => {
		const highlighted = chart?.files?.[0]?.highlightedContent ?? '';
		const pre = document.createElement('pre');
		pre.innerHTML = highlighted;
		code = pre.textContent ?? '';
	});

	const chartTitle = $derived.by(() => {
		const name = chart.name;
		if (name.includes('chart-line'))
			return { icon: 'heroicons:arrow-trending-up-solid', label: 'Line Chart' };
		if (name.includes('chart-bar'))
			return { icon: 'heroicons:chart-bar-solid', label: 'Bar Chart' };
		if (name.includes('chart-pie'))
			return { icon: 'heroicons:chart-pie-solid', label: 'Pie Chart' };
		if (name.includes('chart-area'))
			return { icon: 'heroicons:presentation-chart-line-solid', label: 'Area Chart' };
		if (name.includes('chart-radar'))
			return { icon: 'heroicons:signal-solid', label: 'Radar Chart' };
		if (name.includes('chart-radial'))
			return { icon: 'heroicons:chart-pie-solid', label: 'Radial Chart' };
		if (name.includes('chart-tooltip'))
			return { icon: 'heroicons:cursor-arrow-rays-solid', label: 'Tooltip' };
		return { icon: 'heroicons:chart-bar-solid', label: name };
	});
</script>

<div class={cn('flex items-center gap-2', className)}>
	<div class="flex items-center gap-1.5 ps-1 text-[13px] tracking-[-0.3px] text-(--text)/56">
		<Icon icon={chartTitle.icon} class="size-3.5" aria-hidden="true" />
		{chartTitle.label}
	</div>
	<div class="ms-auto flex items-center gap-1.5">
		<button
			type="button"
			aria-label="Copy code"
			class="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
			onclick={() => clipboard.copy(code)}
		>
			{#if clipboard.copied}
				<Icon icon="heroicons:check-solid" class="size-3.5" aria-hidden="true" />
			{:else}
				<Icon icon="heroicons:clipboard-solid" class="size-3.5" aria-hidden="true" />
			{/if}
		</button>
		<Separator orientation="vertical" class="mx-0 hidden h-4! md:block" />
		<ChartCodeViewer {chart} {code}>{@render children?.()}</ChartCodeViewer>
	</div>
</div>
