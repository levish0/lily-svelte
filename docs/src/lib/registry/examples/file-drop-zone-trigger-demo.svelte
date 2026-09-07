<script lang="ts">
	import { Button } from '$lib/registry/ui/button';
	import * as FileDropZone from '$lib/registry/ui/file-drop-zone';
	let files = $state<string[]>([]);
</script>

<FileDropZone.Root
	class="flex w-full max-w-md items-center gap-3 rounded-3xl bg-(--text)/5 p-4"
	clickToSelect={false}
	maxFiles={1}
	accept="image/*"
	onUpload={(uploaded) => {
		files = uploaded.map((file) => file.name);
	}}
>
	<div class="min-w-0 flex-1 text-sm text-(--text)/72">
		{files[0] ?? 'No image selected'}
	</div>
	<FileDropZone.Trigger>
		{#snippet child({ props })}<Button {...props} size="md" class="shrink-0">Choose image</Button
			>{/snippet}
	</FileDropZone.Trigger>
</FileDropZone.Root>
