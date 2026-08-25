<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="image-cropper-controls"
	class={cn('flex w-full items-center justify-end gap-2', className)}
	{...restProps}
>
	{@render children?.()}
</div>
