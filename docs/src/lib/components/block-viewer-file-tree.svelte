<script lang="ts">
	import { BlockViewerContext } from './block-viewer.svelte';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';
	import BlockViewerTree from './block-viewer-tree.svelte';

	const ctx = BlockViewerContext.get();
</script>

<Sidebar.Provider class="h-full min-h-full!">
	<Sidebar.Root collapsible="none" class="w-full flex-1 bg-transparent">
		<Sidebar.GroupLabel
			class="h-12 shrink-0 rounded-none border-b border-(--text)/8 px-4 text-sm text-(--text)/72"
		>
			Files
		</Sidebar.GroupLabel>
		<Sidebar.Group class="overflow-y-auto p-2">
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#if ctx.tree}
						{#each ctx.tree as file, index (index)}
							<BlockViewerTree item={file} index={1} />
						{/each}
					{/if}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Root>
</Sidebar.Provider>
