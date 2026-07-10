<script lang="ts">
	import type { PageProps } from './$types.js';
	import BlockViewer from '$lib/components/block-viewer.svelte';
	import { createFileTreeForRegistryItemFiles } from '$lib/registry/registry-utils.js';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-16 md:gap-24">
	{#each data.blocks as block (block.name)}
		<BlockViewer item={block} tree={createFileTreeForRegistryItemFiles(block.files)} />
	{/each}
</div>
