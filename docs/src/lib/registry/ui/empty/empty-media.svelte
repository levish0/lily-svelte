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
	data-slot="empty-media"
	class={cn(
		'mb-2 flex size-12 items-center justify-center rounded-2xl bg-(--text)/5 text-(--text)/56 [&_svg]:size-6',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
