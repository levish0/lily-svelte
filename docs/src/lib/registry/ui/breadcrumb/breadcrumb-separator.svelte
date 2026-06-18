<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLLiAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLLiAttributes> = $props();
</script>

<li
	bind:this={ref}
	data-slot="breadcrumb-separator"
	role="presentation"
	aria-hidden="true"
	class={cn('text-(--text)/40 [&>svg]:size-3.5', className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		<Icon icon="heroicons:chevron-right-solid" aria-hidden="true" />
	{/if}
</li>
