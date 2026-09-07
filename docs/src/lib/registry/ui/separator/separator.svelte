<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		orientation?: 'horizontal' | 'vertical';
		decorative?: boolean;
	};

	let {
		ref = $bindable(null),
		orientation = 'horizontal',
		decorative = true,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	bind:this={ref}
	data-slot="separator"
	data-orientation={orientation}
	role={decorative ? 'none' : 'separator'}
	aria-orientation={decorative ? undefined : orientation}
	class={cn(
		'lily-separator-1 shrink-0 bg-(--text)/8',
		orientation === 'horizontal' ? 'lily-separator-2 h-px w-full' : 'lily-separator-3 h-full w-px',
		className
	)}
	{...restProps}
></div>
