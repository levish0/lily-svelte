<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item
	bind:ref
	data-slot="radio-group-item"
	class={cn(
		'flex aspect-square size-5 shrink-0 items-center justify-center rounded-full border border-(--text)/24 transition-colors duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-(--text)',
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		{#if checked}
			<div class="size-3 animate-in rounded-full bg-(--text) duration-150 zoom-in-50"></div>
		{/if}
	{/snippet}
</RadioGroupPrimitive.Item>
