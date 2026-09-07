<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';
	let {
		ref = $bindable(null),
		class: className,
		children,
		supporting,
		sticky = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		supporting?: Snippet;
		sticky?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="action-footer"
	class={cn(
		'lily-action-footer-root flex flex-col gap-3 bg-transparent px-4 pt-4 pb-[max(16px,env(safe-area-inset-bottom))]',
		sticky && 'sticky bottom-0 z-20 bg-(--bg)',
		className
	)}
	{...restProps}
>
	{@render supporting?.()}
	<div class={cn('lily-action-footer-actions flex items-center gap-2 [&>*]:flex-1')}>
		{@render children?.()}
	</div>
</div>
