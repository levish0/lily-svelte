<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		size = 'md',
		isActive = false,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
		size?: 'sm' | 'md';
		isActive?: boolean;
	} = $props();

	const mergedProps = $derived({
		class: cn(
			'flex h-8 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-xl px-2.5 tracking-[-0.39px] text-(--text)/56 outline-none transition-colors duration-150 select-none hover:bg-(--text)/5 hover:text-(--text) focus-visible:bg-(--text)/5 focus-visible:text-(--text) disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-(--text)/8 data-active:font-medium data-active:text-(--text) data-[size=md]:text-sm data-[size=sm]:text-xs group-data-[collapsible=icon]:hidden [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
			className
		),
		'data-slot': 'sidebar-menu-sub-button',
		'data-sidebar': 'menu-sub-button',
		'data-size': size,
		'data-active': isActive,
		...restProps
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<a bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</a>
{/if}
