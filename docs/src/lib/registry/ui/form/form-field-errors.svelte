<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import { FieldError } from '$lib/registry/ui/field/index.js';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children: childrenProp,
		...restProps
	}: WithoutChild<FormPrimitive.FieldErrorsProps> = $props();
</script>

<!-- `empty:hidden` keeps the live region mounted but stops it eating a row of the
	 parent Field's flex gap while there are no errors -->
<FormPrimitive.FieldErrors
	bind:ref
	data-slot="form-field-errors"
	class={cn('flex flex-col gap-1 empty:hidden', className)}
	{...restProps}
>
	{#snippet children({ errors, errorProps })}
		{#if childrenProp}
			{@render childrenProp({ errors, errorProps })}
		{:else}
			{#each errors as error (error)}
				<FieldError {...errorProps}>{error}</FieldError>
			{/each}
		{/if}
	{/snippet}
</FormPrimitive.FieldErrors>
