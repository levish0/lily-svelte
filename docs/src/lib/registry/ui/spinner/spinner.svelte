<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="spinner"
	role="status"
	aria-label="Loading"
	class={cn(
		// currentColor, so the spinner reads correctly on any surface it is dropped onto —
		// a solid button, a destructive button, a coloured banner
		'size-5 animate-spin rounded-full border-2 border-current/12 border-t-current',
		className
	)}
	{...restProps}
></div>
