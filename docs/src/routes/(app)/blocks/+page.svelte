<script lang="ts">
	import type { PageProps } from './$types.js';
	import BlockViewer from '#lib/components/block-viewer.svelte';
	import { createFileTreeForRegistryItemFiles } from '#lib/registry/registry-utils.js';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-16 md:gap-24">
	{#each data.blocks as block (block.name)}
		<BlockViewer item={block} tree={createFileTreeForRegistryItemFiles(block.files)} />
	{/each}
	<div class="flex justify-center pb-6">
		<a
			href="/blocks/sidebar"
			class="inline-flex h-10 items-center rounded-3xl bg-(--text)/5 px-5 text-sm font-medium tracking-[-0.39px] text-(--text)/72 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
		>
			Browse more blocks
		</a>
	</div>
</div>
