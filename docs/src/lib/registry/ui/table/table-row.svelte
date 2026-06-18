<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> = $props();
</script>

<tr
	bind:this={ref}
	data-slot="table-row"
	class={cn(
		'border-b border-(--text)/8 transition-colors duration-150 hover:bg-(--text)/4 data-[state=selected]:bg-(--text)/6',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</tr>
