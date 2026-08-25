<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import { FieldDescription } from '$lib/registry/ui/field/index.js';
	import type { WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithoutChild<FormPrimitive.DescriptionProps> = $props();
</script>

<FormPrimitive.Description {...restProps}>
	{#snippet child({ props })}
		<FieldDescription bind:ref data-slot="form-description" {...props}>
			{@render children?.()}
		</FieldDescription>
	{/snippet}
</FormPrimitive.Description>
