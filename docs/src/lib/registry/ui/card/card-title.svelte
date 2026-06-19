<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> = $props();
</script>

<h3
	bind:this={ref}
	data-slot="card-title"
	class={cn('text-base leading-[1.5] font-medium tracking-[-0.48px] text-(--text)', className)}
	{...restProps}
>
	{@render children?.()}
</h3>
