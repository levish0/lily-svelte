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
	data-slot="field-error"
	class={cn('text-xs leading-[1.5] tracking-[-0.3px] text-red-600 dark:text-red-400', className)}
	{...restProps}
>
	{@render children?.()}
</p>
