<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, type ButtonProps } from '$lib/registry/ui/button/index.js';
	import { useImageCropperRoot } from './image-cropper.svelte.js';

	let {
		ref = $bindable(null),
		variant = 'solid',
		size = 'sm',
		onclick,
		children,
		...restProps
	}: ButtonProps = $props();

	type ButtonClick = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

	const root = useImageCropperRoot();
</script>

<Button
	bind:ref
	{variant}
	{size}
	loading={root.cropping}
	data-slot="image-cropper-crop"
	class="gap-1.5"
	onclick={(e) => {
		onclick?.(e as ButtonClick);
		root.onCrop();
	}}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon="heroicons:check-solid" class="size-4" aria-hidden="true" />
		Crop
	{/if}
</Button>
