<script lang="ts">
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
	<!-- heroicons: ellipsis-horizontal -->
	<svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M6 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm7.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm6 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
	</svg>
	<span class="sr-only">More pages</span>
</span>
