<script lang="ts">
	import * as FileDropZone from '$lib/registry/ui/file-drop-zone';

	let uploaded = $state('');
	let deleted = $state(0);
</script>

<FileDropZone.Root
	clickToSelect={false}
	maxFiles={1}
	onUpload={(files) => {
		uploaded = files[0]?.name ?? '';
	}}
>
	<FileDropZone.Trigger data-testid="file-trigger">Choose file</FileDropZone.Trigger>
	<button type="button" data-testid="delete" onclick={() => deleted++}>Delete</button>
</FileDropZone.Root>

<output data-testid="uploaded">{uploaded}</output>
<output data-testid="deleted">{deleted}</output>

<FileDropZone.Root maxFiles={1} />
