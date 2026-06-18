<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableElement>, HTMLTableElement> = $props();
</script>

<div
	data-slot="table-container"
	class="relative w-full overflow-x-auto rounded-3xl bg-(--bg-elevated)"
>
	<table
		bind:this={ref}
		data-slot="table"
		class={cn('w-full caption-bottom text-sm tracking-[-0.39px]', className)}
		{...restProps}
	>
		{@render children?.()}
	</table>
</div>
