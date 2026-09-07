<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	let {
		ref = $bindable(null),
		columns = 3,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLUListElement>> & { columns?: 1 | 2 | 3 } = $props();
</script>

<ul
	bind:this={ref}
	data-slot="grid-list"
	class={cn('lily-grid-list-base grid list-none gap-2 p-0', className)}
	style:grid-template-columns={`repeat(${columns}, minmax(0, 1fr))`}
	{...restProps}
>
	{@render children?.()}
</ul>
