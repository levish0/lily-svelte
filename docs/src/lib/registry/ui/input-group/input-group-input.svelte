<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...restProps
	}: WithElementRef<HTMLInputAttributes, HTMLInputElement> = $props();
</script>

<input
	bind:this={ref}
	bind:value
	data-slot="input-group-input"
	class={cn(
		'h-full w-full min-w-0 flex-1 bg-transparent px-4 text-sm tracking-[-0.39px] text-(--text) outline-none [appearance:textfield] placeholder:text-(--text)/40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	{...restProps}
/>
