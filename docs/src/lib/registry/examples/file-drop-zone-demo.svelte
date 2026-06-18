<script lang="ts">
	import { FileDropZone } from '$lib/registry/ui/file-drop-zone';

	let files = $state<string[]>([]);
</script>

<div class="flex w-full max-w-md flex-col gap-3">
	<FileDropZone
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
