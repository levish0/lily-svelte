<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement> = $props();
</script>

<!-- a legend sits outside the fieldset's flex flow, so it carries its own bottom margin -->
<legend
	bind:this={ref}
	data-slot="field-legend"
	class={cn('mb-3 text-sm font-medium tracking-[-0.39px] select-none', className)}
	{...restProps}
>
	{@render children?.()}
</legend>
