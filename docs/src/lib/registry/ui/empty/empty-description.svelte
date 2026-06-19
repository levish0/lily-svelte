<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
	bind:this={ref}
	data-slot="empty-description"
	class={cn('max-w-sm text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/56', className)}
	{...restProps}
>
	{@render children?.()}
</p>
