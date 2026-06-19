<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLLabelAttributes, HTMLLabelElement> = $props();
</script>

<label
	bind:this={ref}
	data-slot="field-label"
	class={cn('text-sm font-medium tracking-[-0.39px] select-none', className)}
	{...restProps}
>
	{@render children?.()}
</label>
