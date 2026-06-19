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

<thead
	bind:this={ref}
	data-slot="table-header"
	class={cn('[&_tr]:border-b [&_tr]:border-(--text)/8', className)}
	{...restProps}
>
	{@render children?.()}
</thead>
