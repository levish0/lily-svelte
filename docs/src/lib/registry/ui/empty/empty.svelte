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
	data-slot="empty"
	class={cn(
		'flex w-full flex-col items-center justify-center gap-2 rounded-3xl px-6 py-12 text-center',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
