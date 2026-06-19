<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="dropdown-menu-label"
	class={cn('px-3 py-1.5 text-xs font-medium tracking-[-0.3px] text-(--text)/56', className)}
	{...restProps}
>
	{@render children?.()}
</div>
