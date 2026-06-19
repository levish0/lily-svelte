<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		child,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const mergedProps = $derived({
		...restProps,
		class: cn(
			'flex items-center rounded-3xl bg-(--text)/5 px-4 text-sm tracking-[-0.39px] text-(--text)/72 [&_svg]:pointer-events-none [&_svg]:size-4',
			className
		),
		'data-slot': 'button-group-text'
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
