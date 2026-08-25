<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import { FieldLegend } from '$lib/registry/ui/field/index.js';
	import { cn, type WithElementRef, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<
		Omit<WithoutChild<FormPrimitive.LegendProps>, 'ref'>,
		HTMLLegendElement
	> = $props();
</script>

<FormPrimitive.Legend {...restProps}>
	{#snippet child({ props })}
		<FieldLegend
			bind:ref
			data-slot="form-legend"
			{...props}
			class={cn('data-[fs-error]:text-red-600 dark:data-[fs-error]:text-red-400', className)}
		>
			{@render children?.()}
		</FieldLegend>
	{/snippet}
</FormPrimitive.Legend>
