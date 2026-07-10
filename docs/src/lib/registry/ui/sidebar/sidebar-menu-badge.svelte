<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="sidebar-menu-badge"
	data-sidebar="menu-badge"
	class={cn(
		'pointer-events-none absolute end-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium tabular-nums text-(--text)/56 select-none peer-hover/menu-button:text-(--text) peer-data-active/menu-button:text-(--text) peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-3.5 peer-data-[size=sm]/menu-button:top-1.5 group-data-[collapsible=icon]:hidden',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
