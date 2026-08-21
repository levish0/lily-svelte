<script lang="ts">
	import { Slider as SliderPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		orientation = 'horizontal',
		class: className,
		...restProps
	}: WithoutChildrenOrChild<SliderPrimitive.RootProps> = $props();
</script>

<SliderPrimitive.Root
	bind:ref
	bind:value={value as never}
	data-slot="slider"
	{orientation}
	class={cn(
		'relative flex touch-none items-center select-none data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50',
		className
	)}
	{...restProps}
>
	{#snippet children({ thumbItems })}
		<span
			data-slot="slider-track"
			data-orientation={orientation}
			class="relative grow overflow-hidden rounded-full bg-(--text)/12 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5"
		>
			<SliderPrimitive.Range
				data-slot="slider-range"
				data-orientation={orientation}
				class="absolute rounded-full bg-(--text) data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
			/>
		</span>
		{#each thumbItems as thumb (thumb.index)}
			<SliderPrimitive.Thumb
				index={thumb.index}
				data-slot="slider-thumb"
				class="block size-5 shrink-0 rounded-full border border-(--text)/8 bg-(--bg-elevated) shadow-sm transition-[box-shadow,transform] outline-none focus-visible:ring-2 focus-visible:ring-(--text)/24 active:scale-110 disabled:pointer-events-none disabled:opacity-50"
			/>
		{/each}
	{/snippet}
</SliderPrimitive.Root>
