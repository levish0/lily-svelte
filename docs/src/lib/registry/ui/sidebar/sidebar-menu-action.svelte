<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		showOnHover = false,
		children,
		child,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
		showOnHover?: boolean;
	} = $props();

	const mergedProps = $derived({
		class: cn(
			'absolute end-2 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-(--text)/40 outline-none transition-colors duration-150 peer-hover/menu-button:text-(--text) hover:bg-(--text)/8 hover:text-(--text) group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-3.5 peer-data-[size=sm]/menu-button:top-1.5 after:absolute after:-inset-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
			showOnHover &&
				'peer-data-active/menu-button:text-(--text) group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-open:opacity-100 md:opacity-0',
			className
		),
		'data-slot': 'sidebar-menu-action',
		'data-sidebar': 'menu-action',
		...restProps
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<button bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</button>
{/if}
