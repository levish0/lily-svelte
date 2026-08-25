<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import { FieldLabel } from '$lib/registry/ui/field/index.js';
	import { cn, type WithElementRef, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<
		Omit<WithoutChild<FormPrimitive.LabelProps>, 'ref'>,
		HTMLLabelElement
	> = $props();
</script>

<FormPrimitive.Label {...restProps}>
	{#snippet child({ props })}
		<FieldLabel
			bind:ref
			data-slot="form-label"
			{...props}
			class={cn('data-[fs-error]:text-red-600 dark:data-[fs-error]:text-red-400', className)}
		>
			{@render children?.()}
		</FieldLabel>
	{/snippet}
</FormPrimitive.Label>
