<script lang="ts">
	import Icon from '@iconify/svelte';
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

	const emblaCtx = getEmblaContext('<Carousel.Next/>');
</script>

<Button
	data-slot="carousel-next"
	{variant}
	{size}
	aria-disabled={!emblaCtx.canScrollNext}
	disabled={!emblaCtx.canScrollNext}
	class={cn(
		'absolute touch-manipulation rounded-full',
		emblaCtx.orientation === 'horizontal'
			? '-end-12 top-1/2 -translate-y-1/2'
			: '-bottom-12 start-1/2 -translate-x-1/2 rotate-90',
		className
	)}
	onclick={emblaCtx.scrollNext}
	onkeydown={emblaCtx.handleKeyDown}
	bind:ref
	{...restProps}
>
	<Icon icon="heroicons:chevron-right-solid" class="size-4" aria-hidden="true" />
	<span class="sr-only">Next slide</span>
</Button>
