<script lang="ts">
	import type { WithoutChildren } from 'bits-ui';
	import { getEmblaContext } from './context.js';
	import { cn } from '$lib/utils.js';
	import { Button, type ButtonProps } from '$lib/registry/ui/button/index.js';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'ghost',
		size = 'icon',
		...restProps
	}: WithoutChildren<ButtonProps> = $props();

	const emblaCtx = getEmblaContext('<Carousel.Previous/>');
</script>

<Button
	data-slot="carousel-previous"
	{variant}
	{size}
	aria-disabled={!emblaCtx.canScrollPrev}
	disabled={!emblaCtx.canScrollPrev}
	class={cn(
		'absolute touch-manipulation rounded-full',
		emblaCtx.orientation === 'horizontal'
			? '-start-12 top-1/2 -translate-y-1/2'
			: '-top-12 start-1/2 -translate-x-1/2 rotate-90',
		className
	)}
	onclick={emblaCtx.scrollPrev}
	onkeydown={emblaCtx.handleKeyDown}
	bind:ref
	{...restProps}
>
	<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
	<span class="sr-only">Previous slide</span>
</Button>
