<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPathLeaves<T>">
	import * as FormPrimitive from 'formsnap';
	import type { FormPathLeaves } from 'sveltekit-superforms';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Field } from '$lib/registry/ui/field/index.js';
	import type { WithElementRef, WithoutChildren } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		form,
		name,
		children: childrenProp,
		...restProps
	}: FormPrimitive.ElementFieldProps<T, U> &
		WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<FormPrimitive.ElementField {form} {name}>
	{#snippet children({ constraints, errors, tainted, value })}
		<Field bind:ref data-slot="form-element-field" {...restProps}>
			{@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
		</Field>
	{/snippet}
</FormPrimitive.ElementField>
