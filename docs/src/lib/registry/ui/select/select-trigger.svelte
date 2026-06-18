<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	class={cn(
		'flex h-10 w-fit min-w-44 items-center justify-between gap-2 rounded-3xl bg-(--text)/5 px-4 py-2 text-sm tracking-[-0.39px] outline-none transition-colors duration-150 hover:bg-(--text)/8 focus-visible:bg-(--text)/10 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<Icon
		icon="heroicons:chevron-up-down-solid"
		class="size-4 shrink-0 text-(--text)/40"
		aria-hidden="true"
	/>
</SelectPrimitive.Trigger>
