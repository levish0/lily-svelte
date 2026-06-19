<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert-description"
	class={cn(
		'col-start-2 leading-[1.6] opacity-72 [&_a]:underline [&_a]:underline-offset-2',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
