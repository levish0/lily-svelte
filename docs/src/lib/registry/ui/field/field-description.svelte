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
	data-slot="field-description"
	class={cn(
		'lily-field-description-1 text-xs leading-[1.5] tracking-[-0.3px] text-(--text)/56',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</p>
