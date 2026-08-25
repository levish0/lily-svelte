<script lang="ts">
	import * as FileDropZone from '$lib/registry/ui/file-drop-zone';

	let files = $state<string[]>([]);
</script>

<div class="flex w-full max-w-md flex-col gap-3">
	<FileDropZone.Root
		accept="image/*"
		maxFiles={5}
		fileCount={files.length}
		maxFileSize={5 * 1024 * 1024}
		onUpload={(uploaded) => {
			files = [...files, ...uploaded.map((f) => f.name)];
		}}
	/>
	{#if files.length}
		<ul class="flex flex-col gap-1 text-sm tracking-[-0.39px] text-(--text)/72">
			{#each files as name (name)}
				<li>{name}</li>
			{/each}
		</ul>
	{/if}
</div>

<FileDropZone.Root
	class="mt-6 flex w-full max-w-md items-center gap-3 rounded-3xl bg-(--text)/5 p-4"
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
	<FileDropZone.Trigger
		class="shrink-0 cursor-pointer rounded-full bg-(--text) px-4 py-2 text-sm font-medium text-(--bg)"
	>
		Choose image
	</FileDropZone.Trigger>
</FileDropZone.Root>
