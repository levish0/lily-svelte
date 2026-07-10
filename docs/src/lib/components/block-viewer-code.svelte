<script lang="ts">
	import Icon from '@iconify/svelte';
	import BlockViewerCopyCodeButton from './block-viewer-copy-code-button.svelte';
	import BlockViewerFileTree from './block-viewer-file-tree.svelte';
	import { BlockViewerContext } from './block-viewer.svelte';

	const ctx = BlockViewerContext.get();

	const file = $derived(ctx.item.files?.find((f) => f.target === ctx.activeFile));
</script>

{#if file}
	<div
		class="hidden overflow-hidden rounded-3xl border border-(--text)/8 bg-(--bg-elevated) group-data-[view=preview]/block-view-wrapper:hidden lg:flex lg:h-(--height)"
	>
		<div class="w-72 shrink-0 border-e border-(--text)/8">
			<BlockViewerFileTree />
		</div>
		<figure class="mx-0 my-0 flex min-w-0 flex-1 flex-col">
			<figcaption
				class="flex h-12 shrink-0 items-center gap-2 border-b border-(--text)/8 px-4 text-sm tracking-[-0.39px] text-(--text)/72"
			>
				<Icon icon="heroicons:document-solid" class="size-4 text-(--text)/40" aria-hidden="true" />
				{file.target}
				<div class="ms-auto flex items-center gap-2">
					<BlockViewerCopyCodeButton />
				</div>
			</figcaption>
			<div
				class="code-block overflow-y-auto text-[13px] leading-relaxed [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:px-5 [&_pre]:py-4 [&_pre]:outline-none"
				{@attach (node) => {
					if (file?.highlightedContent) {
						ctx.activeFileCodeToCopy = node.innerText;
					}
				}}
			>
				{#if file.highlightedContent}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html file.highlightedContent}
				{/if}
			</div>
		</figure>
	</div>
{/if}
