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
	data-slot="input-group"
	class={cn(
		'flex h-10 w-full items-center overflow-hidden rounded-3xl bg-(--text)/5 transition-colors duration-150 focus-within:bg-(--text)/8',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
