<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'vertical',
		children,
		...restProps
	}: WithoutChild<ScrollAreaPrimitive.ScrollbarProps> = $props();
</script>

<ScrollAreaPrimitive.Scrollbar
	bind:ref
	data-slot="scroll-area-scrollbar"
	data-orientation={orientation}
	{orientation}
	class={cn(
		'lily-scroll-area-scrollbar-1 flex touch-none p-0.5 transition-colors select-none',
		orientation === 'vertical' && 'lily-scroll-area-scrollbar-2 h-full w-2.5',
		orientation === 'horizontal' && 'lily-scroll-area-scrollbar-3 h-2.5 flex-col',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ScrollAreaPrimitive.Thumb
		data-slot="scroll-area-thumb"
		class={cn(
			'lily-scroll-area-scrollbar-4 relative flex-1 rounded-full bg-(--text)/16 transition-colors hover:bg-(--text)/24'
		)}
	/>
</ScrollAreaPrimitive.Scrollbar>
