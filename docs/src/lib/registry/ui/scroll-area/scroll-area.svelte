<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';
	import { Scrollbar } from './index.js';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		viewportRef = $bindable(null),
		class: className,
		orientation = 'vertical',
		fade = true,
		scrollbarXClasses = '',
		scrollbarYClasses = '',
		children,
		...restProps
	}: WithoutChild<ScrollAreaPrimitive.RootProps> & {
		orientation?: 'vertical' | 'horizontal' | 'both' | undefined;
		fade?: boolean;
		scrollbarXClasses?: string | undefined;
		scrollbarYClasses?: string | undefined;
		viewportRef?: HTMLElement | null;
	} = $props();

	// Soften the edges so scrolled content fades out instead of cutting abruptly.
	const maskClass = $derived(
		!fade
			? ''
			: orientation === 'horizontal'
				? '[mask-image:linear-gradient(to_right,transparent,#000_0.9rem,#000_calc(100%-0.9rem),transparent)]'
				: '[mask-image:linear-gradient(to_bottom,transparent,#000_0.9rem,#000_calc(100%-0.9rem),transparent)]'
	);
</script>

<ScrollAreaPrimitive.Root
	bind:ref
	data-slot="scroll-area"
	class={cn('relative', className)}
	{...restProps}
>
	<ScrollAreaPrimitive.Viewport
		bind:ref={viewportRef}
		data-slot="scroll-area-viewport"
		class={cn('size-full rounded-[inherit] outline-none', maskClass)}
	>
		{@render children?.()}
	</ScrollAreaPrimitive.Viewport>
	{#if orientation === 'vertical' || orientation === 'both'}
		<Scrollbar orientation="vertical" class={scrollbarYClasses} />
	{/if}
	{#if orientation === 'horizontal' || orientation === 'both'}
		<Scrollbar orientation="horizontal" class={scrollbarXClasses} />
	{/if}
	<ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
