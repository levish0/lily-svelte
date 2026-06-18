<script lang="ts">
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		isActive,
		page,
		children,
		...restProps
	}: PaginationPrimitive.PageProps & {
		isActive: boolean;
	} = $props();
</script>

<PaginationPrimitive.Page
	bind:ref
	{page}
	aria-current={isActive ? 'page' : undefined}
	data-slot="pagination-link"
	data-active={isActive}
	class={cn(
		'inline-flex size-10 items-center justify-center rounded-2xl text-sm tracking-[-0.39px] outline-none transition-colors duration-150',
		isActive
			? 'bg-(--text)/8 font-medium text-(--text)'
			: 'text-(--text)/72 hover:bg-(--text)/8 hover:text-(--text)',
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{page.value}
	{/if}
</PaginationPrimitive.Page>
