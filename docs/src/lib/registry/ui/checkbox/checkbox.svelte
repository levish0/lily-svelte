<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={cn(
		'peer flex size-5 shrink-0 items-center justify-center rounded-md border border-(--text)/24 outline-none transition-colors duration-150 data-[state=checked]:border-(--text) data-[state=checked]:bg-(--text) data-[state=checked]:text-(--bg) disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		{#if indeterminate}
			<Icon icon="heroicons:minus-solid" class="size-3.5" aria-hidden="true" />
		{:else if checked}
			<Icon icon="heroicons:check-solid" class="size-3.5" aria-hidden="true" />
		{/if}
	{/snippet}
</CheckboxPrimitive.Root>
