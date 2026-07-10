<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		child,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const mergedProps = $derived({
		class: cn(
			'absolute end-4 top-4 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-(--text)/40 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
			className
		),
		'data-slot': 'sidebar-group-action',
		'data-sidebar': 'group-action',
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
