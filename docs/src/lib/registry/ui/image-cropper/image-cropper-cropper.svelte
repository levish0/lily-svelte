<script lang="ts">
	import Cropper, { type CropperProps } from 'svelte-easy-crop';
	import { cn } from '$lib/utils.js';
	import { useImageCropperRoot } from './image-cropper.svelte.js';

	let {
		cropShape = 'round',
		aspect = 1,
		showGrid = false,
		class: className,
		...restProps
	}: Partial<Omit<CropperProps, 'image' | 'oncropcomplete' | 'zoom'>> & {
		class?: string;
	} = $props();

	const root = useImageCropperRoot();
</script>

<!-- svelte-easy-crop fills its nearest positioned ancestor -->
<div
	data-slot="image-cropper-cropper"
	class={cn('relative h-72 w-full overflow-hidden rounded-2xl bg-(--text)/5', className)}
>
	{#if root.tempUrl}
		<Cropper
			image={root.tempUrl}
			bind:zoom={root.zoom}
			{cropShape}
			{aspect}
			{showGrid}
			oncropcomplete={root.onCropComplete}
			{...restProps}
		/>
	{/if}
</div>
