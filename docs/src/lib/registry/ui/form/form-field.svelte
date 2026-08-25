<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import * as FormPrimitive from 'formsnap';
	import type { FormPath } from 'sveltekit-superforms';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Field } from '$lib/registry/ui/field/index.js';
	import type { WithElementRef, WithoutChildren } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		form,
		name,
		children: childrenProp,
		...restProps
	}: FormPrimitive.FieldProps<T, U> &
		WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<FormPrimitive.Field {form} {name}>
	{#snippet children({ constraints, errors, tainted, value })}
		<Field bind:ref data-slot="form-field" {...restProps}>
			{@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
		</Field>
	{/snippet}
</FormPrimitive.Field>
