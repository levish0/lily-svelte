<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { FileTree } from '$lib/registry/registry-utils.js';
	import BlockViewerTree from './block-viewer-tree.svelte';
	import { BlockViewerContext } from './block-viewer.svelte';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';
	import * as Collapsible from '$lib/registry/ui/collapsible/index.js';

	const ctx = BlockViewerContext.get();

	let { item, index }: { item: FileTree; index: number } = $props();
</script>

{#if !item.children}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			style="--index: {index}rem"
			isActive={item.path === ctx.activeFile}
			onclick={() => {
				if (!item.path) return;
				ctx.activeFile = item.path;
			}}
			class="ps-(--index) whitespace-nowrap"
			data-index={index}
		>
			<Icon icon="heroicons:document-solid" class="size-4 shrink-0" aria-hidden="true" />
			{item.name}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else}
	<Sidebar.MenuItem>
		<Collapsible.Root
			class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
			open={true}
		>
			<Collapsible.Trigger style="--index: {index - 1}rem" class="ps-(--index) whitespace-nowrap">
				{#snippet child({ props })}
					<Sidebar.MenuButton {...props}>
						<Icon
							icon="heroicons:chevron-right-solid"
							class="size-3.5 shrink-0 transition-transform"
							aria-hidden="true"
						/>
						<Icon icon="heroicons:folder-solid" class="size-4 shrink-0" aria-hidden="true" />
						{item.name}
					</Sidebar.MenuButton>
				{/snippet}
			</Collapsible.Trigger>
			<Collapsible.Content>
				<Sidebar.MenuSub class="m-0 w-full translate-x-0 border-none p-0">
					{#each item.children as subItem, key (key)}
						<BlockViewerTree item={subItem} index={index + 1} />
					{/each}
				</Sidebar.MenuSub>
			</Collapsible.Content>
		</Collapsible.Root>
	</Sidebar.MenuItem>
{/if}
