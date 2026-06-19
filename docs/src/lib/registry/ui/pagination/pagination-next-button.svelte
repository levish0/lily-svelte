<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PaginationPrimitive.NextButtonProps = $props();
</script>

<PaginationPrimitive.NextButton
	bind:ref
	aria-label="Go to next page"
	data-slot="pagination-next"
	class={cn(
		'inline-flex h-10 items-center gap-1 rounded-2xl px-3 text-sm tracking-[-0.39px] text-(--text)/72 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) disabled:pointer-events-none disabled:opacity-40',
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		<span class="hidden sm:block">Next</span>
		<Icon icon="heroicons:chevron-right-solid" class="size-4" aria-hidden="true" />
	{/if}
</PaginationPrimitive.NextButton>
