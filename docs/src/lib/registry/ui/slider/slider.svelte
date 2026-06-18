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
		'relative flex touch-none items-center select-none data-disabled:opacity-50 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
		className
	)}
	{...restProps}
>
	{#snippet children({ thumbItems })}
		<span
			data-slot="slider-track"
			class="relative grow overflow-hidden rounded-full bg-(--text)/12 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5"
		>
			<SliderPrimitive.Range
				data-slot="slider-range"
				class="absolute rounded-full bg-(--text) data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
			/>
		</span>
		{#each thumbItems as thumb (thumb.index)}
			<SliderPrimitive.Thumb
				index={thumb.index}
				data-slot="slider-thumb"
				class="block size-4.5 shrink-0 rounded-full bg-(--bg-elevated) shadow-md ring-1 ring-(--text)/8 outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-(--text)/24 disabled:pointer-events-none disabled:opacity-50"
			/>
		{/each}
	{/snippet}
</SliderPrimitive.Root>
