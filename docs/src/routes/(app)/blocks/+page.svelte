<script lang="ts">
	import type { PageProps } from './$types.js';
	import Seo from '$lib/components/seo.svelte';
	import BlockViewer from '$lib/components/block-viewer.svelte';
	import { createFileTreeForRegistryItemFiles } from '$lib/registry/registry-utils.js';

	let { data }: PageProps = $props();
</script>

<Seo
	title="Blocks · lily"
	description="Ready-made blocks built with lily components. Copy and paste into your apps."
/>

<div class="mx-auto w-full max-w-[88rem] flex-1 px-6 py-10 lg:px-8">
	<div class="mb-10 flex max-w-2xl flex-col gap-3">
		<h1 class="text-3xl font-bold tracking-[-0.75px]">Blocks</h1>
		<p class="text-base tracking-[-0.45px] text-(--text)/56">
			Ready-made blocks built with lily components. Open them full-screen, resize the preview, and
			copy the source into your apps.
		</p>
	</div>

	<div class="flex flex-col gap-16 md:gap-24">
		{#each data.blocks as block (block.name)}
			<BlockViewer item={block} tree={createFileTreeForRegistryItemFiles(block.files)} />
		{/each}
	</div>
</div>
