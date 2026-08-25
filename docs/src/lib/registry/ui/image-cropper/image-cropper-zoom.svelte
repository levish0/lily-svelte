<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Slider } from '$lib/registry/ui/slider/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useImageCropperRoot } from './image-cropper.svelte.js';

	let {
		ref = $bindable(null),
		min = 1,
		max = 3,
		step = 0.01,
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		min?: number;
		max?: number;
		step?: number;
	} = $props();

	const root = useImageCropperRoot();
</script>

<div
	bind:this={ref}
	data-slot="image-cropper-zoom"
	class={cn('flex items-center gap-3 px-1 text-(--text)/40', className)}
	{...restProps}
>
	<Icon icon="heroicons:magnifying-glass-minus-solid" class="size-4 shrink-0" aria-hidden="true" />
	<Slider type="single" bind:value={root.zoom} {min} {max} {step} aria-label="Zoom" />
	<Icon icon="heroicons:magnifying-glass-plus-solid" class="size-4 shrink-0" aria-hidden="true" />
</div>
