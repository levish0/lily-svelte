<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		align = 'inline-start',
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		align?: 'inline-start' | 'inline-end';
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="input-group-addon"
	data-align={align}
	class={cn(
		'flex shrink-0 items-center text-sm tracking-[-0.39px] text-(--text)/56 [&_svg]:size-4',
		align === 'inline-start' ? 'ps-4' : 'pe-2',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
