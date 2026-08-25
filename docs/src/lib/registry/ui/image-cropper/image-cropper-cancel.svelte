<script lang="ts">
	import { Button, type ButtonProps } from '$lib/registry/ui/button/index.js';
	import { useImageCropperRoot } from './image-cropper.svelte.js';

	let {
		ref = $bindable(null),
		variant = 'ghost',
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
	data-slot="image-cropper-cancel"
	onclick={(e) => {
		onclick?.(e as ButtonClick);
		root.onCancel();
	}}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		Cancel
	{/if}
</Button>
