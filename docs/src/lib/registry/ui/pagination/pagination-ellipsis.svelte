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
	aria-hidden="true"
	data-slot="pagination-ellipsis"
	class={cn('flex size-10 items-center justify-center text-(--text)/48', className)}
	{...restProps}
>
	<Icon icon="heroicons:ellipsis-horizontal-solid" class="size-4" aria-hidden="true" />
	<span class="sr-only">More pages</span>
</span>
