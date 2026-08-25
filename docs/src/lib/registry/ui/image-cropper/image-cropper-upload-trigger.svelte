<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import { useImageCropperRoot } from './image-cropper.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLLabelAttributes, HTMLLabelElement> = $props();

	const root = useImageCropperRoot();
</script>

<label
	bind:this={ref}
	for={root.id}
	data-slot="image-cropper-upload-trigger"
	class={cn('inline-block w-fit cursor-pointer', className)}
	{...restProps}
>
	{@render children?.()}
</label>
