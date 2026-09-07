<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
	bind:this={ref}
	data-slot="breadcrumb-ellipsis"
	role="presentation"
	aria-hidden="true"
	class={cn('lily-breadcrumb-ellipsis-1 flex size-5 items-center justify-center', className)}
	{...restProps}
>
	<Icon
		icon="heroicons:ellipsis-horizontal-solid"
		class={cn('lily-breadcrumb-ellipsis-2 size-4')}
		aria-hidden="true"
	/>
	<span class={cn('lily-breadcrumb-ellipsis-3 sr-only')}>More</span>
</span>
