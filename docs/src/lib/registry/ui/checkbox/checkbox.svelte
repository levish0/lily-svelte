<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		variant = 'default',
		class: className,
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
		variant?: 'default' | 'line';
	} = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={cn(
		'peer lily-checkbox-3 flex size-5 shrink-0 items-center justify-center rounded-md border border-(--text)/24 transition-colors duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-(--text) data-[state=checked]:bg-(--text) data-[state=checked]:text-(--bg)',
		variant === 'line' &&
			'lily-checkbox-line border-0 bg-transparent text-(--text)/24 data-[state=checked]:bg-transparent data-[state=checked]:text-(--text)',
		className
	)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		{#if indeterminate}
			<Icon
				icon="heroicons:minus-solid"
				class={cn('lily-checkbox-1 size-3.5')}
				aria-hidden="true"
			/>
		{:else if checked || variant === 'line'}
			<Icon
				icon="heroicons:check-solid"
				class={cn('lily-checkbox-2 size-3.5')}
				aria-hidden="true"
			/>
		{/if}
	{/snippet}
</CheckboxPrimitive.Root>
