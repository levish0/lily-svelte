<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'vertical',
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		orientation?: 'horizontal' | 'vertical';
	} = $props();
</script>

<div
	bind:this={ref}
	role="separator"
	data-slot="button-group-separator"
	data-orientation={orientation}
	class={cn(
		'self-stretch bg-(--bg)',
		orientation === 'vertical' ? 'my-px w-px' : 'mx-px h-px',
		className
	)}
	{...restProps}
></div>
