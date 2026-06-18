<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	data-slot="select-item"
	class={cn(
		'relative flex w-full cursor-default items-center rounded-xl py-2 pe-8 ps-3 text-sm tracking-[-0.39px] outline-none select-none data-highlighted:bg-(--text)/6 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<span class="grow whitespace-nowrap">
			{#if childrenProp}
				{@render childrenProp({ selected, highlighted })}
			{:else}
				{label || value}
			{/if}
		</span>
		{#if selected}
			<span class="absolute end-2.5 flex size-4 items-center justify-center">
				<!-- heroicons: check -->
				<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="m4.5 12.75 6 6 9-13.5" />
				</svg>
			</span>
		{/if}
	{/snippet}
</SelectPrimitive.Item>
