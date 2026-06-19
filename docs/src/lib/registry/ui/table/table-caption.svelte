<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>, HTMLTableCaptionElement> = $props();
</script>

<caption
	bind:this={ref}
	data-slot="table-caption"
	class={cn('py-3.5 text-sm tracking-[-0.39px] text-(--text)/56', className)}
	{...restProps}
>
	{@render children?.()}
</caption>
