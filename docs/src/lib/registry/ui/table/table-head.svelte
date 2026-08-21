<script lang="ts">
	import type { HTMLThAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLThAttributes, HTMLTableCellElement> = $props();
</script>

<th
	bind:this={ref}
	data-slot="table-head"
	class={cn(
		'h-12 px-4 text-left align-middle text-xs font-medium tracking-[-0.3px] whitespace-nowrap text-(--text)/56 [&:has([role=checkbox])]:pr-0',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</th>
