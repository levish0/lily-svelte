<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';
	let {
		ref = $bindable(null),
		class: className,
		title,
		description,
		leading,
		trailing,
		children,
		density = 'default',
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		title?: string;
		description?: string;
		leading?: Snippet;
		trailing?: Snippet;
		density?: 'compact' | 'default' | 'comfortable';
	} = $props();
	const densities = {
		compact: 'py-2 lily-list-row-compact',
		default: 'py-2.5 lily-list-row-default',
		comfortable: 'py-3 lily-list-row-comfortable'
	};
</script>

<div
	bind:this={ref}
	data-slot="list-row"
	class={cn(
		'lily-list-row-root flex w-full items-center gap-3 px-4',
		densities[density],
		className
	)}
	{...restProps}
>
	{#if leading}<div class="shrink-0">{@render leading()}</div>{/if}
	<div class="min-w-0 flex-1">
		{#if title}<div class={cn('lily-list-row-title text-base leading-normal font-medium')}>
				{title}
			</div>{/if}
		{#if description}<div class={cn('lily-list-row-description mt-1 text-sm text-(--text)/56')}>
				{description}
			</div>{/if}
		{@render children?.()}
	</div>
	{#if trailing}<div class="shrink-0">{@render trailing()}</div>{/if}
</div>
