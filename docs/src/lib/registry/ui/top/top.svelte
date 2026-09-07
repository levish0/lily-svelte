<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';
	let {
		ref = $bindable(null),
		class: className,
		title,
		description,
		eyebrow,
		accessory,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		title: string;
		description?: string;
		eyebrow?: string;
		accessory?: Snippet;
	} = $props();
</script>

<section
	bind:this={ref}
	data-slot="top"
	class={cn('lily-top-root flex flex-col gap-4 p-4', className)}
	{...restProps}
>
	<div class="flex items-start justify-between gap-4">
		<div class="min-w-0 flex-1">
			{#if eyebrow}<p class={cn('lily-top-eyebrow mb-2 text-sm text-(--text)/56')}>
					{eyebrow}
				</p>{/if}
			<h2 class={cn('lily-top-title text-2xl leading-snug font-semibold tracking-tight')}>
				{title}
			</h2>
			{#if description}<p
					class={cn('lily-top-description mt-2 text-base leading-relaxed text-(--text)/56')}
				>
					{description}
				</p>{/if}
		</div>
		{@render accessory?.()}
	</div>
	{@render children?.()}
</section>
