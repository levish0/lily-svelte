<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { Dialog, DialogContent } from '$lib/registry/ui/dialog/index.js';
	import { cn } from '$lib/utils.js';
	import { useImageCropperRoot } from './image-cropper.svelte.js';

	let {
		class: className,
		children,
		...restProps
	}: Omit<ComponentProps<typeof DialogContent>, 'showCloseButton'> = $props();

	const root = useImageCropperRoot();
</script>

<Dialog
	bind:open={root.open}
	onOpenChange={(open) => {
		// dismissing via overlay or escape is a cancel
		if (!open) root.onCancel();
	}}
>
	<DialogContent
		data-slot="image-cropper-dialog"
		showCloseButton={false}
		class={cn('gap-4 p-4', className)}
		{...restProps}
	>
		{@render children?.()}
	</DialogContent>
</Dialog>
