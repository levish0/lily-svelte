<script lang="ts">
	import Icon from '@iconify/svelte';
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
		'relative flex w-full cursor-default items-center rounded-xl py-2 pe-8 ps-3 text-sm tracking-[-0.39px] outline-none select-none data-highlighted:bg-(--text)/8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
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
				<Icon icon="heroicons:check-solid" class="size-4" aria-hidden="true" />
			</span>
		{/if}
	{/snippet}
</SelectPrimitive.Item>
