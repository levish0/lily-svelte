<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import * as FormPrimitive from 'formsnap';
	import type { FormPath } from 'sveltekit-superforms';
	import { FieldSet } from '$lib/registry/ui/field/index.js';
	import type { WithElementRef, WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		form,
		name,
		children,
		...restProps
	}: WithElementRef<
		Omit<WithoutChild<FormPrimitive.FieldsetProps<T, U>>, 'ref'>,
		HTMLFieldSetElement
	> = $props();
</script>

<FormPrimitive.Fieldset {form} {name} {...restProps}>
	{#snippet child({ props, ...state })}
		<FieldSet bind:ref data-slot="form-fieldset" {...props}>
			{@render children?.(state)}
		</FieldSet>
	{/snippet}
</FormPrimitive.Fieldset>
