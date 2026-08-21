<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	data-slot="avatar-badge"
	class={cn(
		// the badge is ~25% of the avatar, so the bounding-box corner already lands on the
		// circle at 45°; only lg/xl need a nudge back in. falls back to --bg outside a group
		'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full ring-2 ring-[var(--avatar-ring,var(--bg))] select-none',
		'group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden',
		'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
		'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
		'group-data-[size=lg]/avatar:right-px group-data-[size=lg]/avatar:bottom-px group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2.5',
		'group-data-[size=xl]/avatar:right-0.5 group-data-[size=xl]/avatar:bottom-0.5 group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-3',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
