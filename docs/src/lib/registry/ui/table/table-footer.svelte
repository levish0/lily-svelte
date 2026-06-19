<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> = $props();
</script>

<tfoot
	bind:this={ref}
	data-slot="table-footer"
	class={cn('bg-(--text)/5 font-medium [&>tr]:last:border-b-0', className)}
	{...restProps}
>
	{@render children?.()}
</tfoot>
