<script lang="ts">
	import Icon from '@iconify/svelte';
	import { BlockViewerContext } from './block-viewer.svelte';
	import * as Resizable from '$lib/registry/ui/resizable/index.js';
	import BlockViewerIframe from './block-viewer-iframe.svelte';

	const ctx = BlockViewerContext.get();
</script>

<!-- Small screens: plain (non-resizable) preview with a slim caption row. -->
<div class="flex flex-col gap-2 lg:hidden">
	<div class="flex items-center gap-2 px-1">
		<p class="flex-1 truncate text-sm tracking-[-0.39px] text-(--text)/72">
			{ctx.item.description ?? ctx.item.name}
		</p>
		<a
			href="/view/{ctx.item.name}"
			target="_blank"
			rel="noreferrer"
			title="Open in New Tab"
			class="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
		>
			<span class="sr-only">Open in New Tab</span>
			<Icon icon="heroicons:arrow-top-right-on-square-solid" class="size-4" aria-hidden="true" />
		</a>
	</div>
	<div class="overflow-hidden rounded-3xl border border-(--text)/8 bg-(--bg)">
		<BlockViewerIframe />
	</div>
</div>

<div class="hidden group-data-[view=code]/block-view-wrapper:hidden lg:flex lg:h-(--height)">
	<div class="relative grid w-full gap-4">
		<div
			class="absolute inset-0 end-4 rounded-3xl bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#333333_1px,transparent_1px)]"
		></div>
		<Resizable.PaneGroup direction="horizontal" class="relative z-10">
			<Resizable.Pane
				bind:this={ctx.resizablePaneRef}
				class="relative overflow-hidden rounded-3xl border border-(--text)/8 bg-(--bg)"
				defaultSize={100}
				minSize={30}
			>
				<BlockViewerIframe />
			</Resizable.Pane>
			<Resizable.Handle
				class="relative z-20 hidden w-3 bg-transparent p-0 hover:bg-transparent focus-visible:bg-transparent after:absolute after:end-0 after:top-1/2 after:h-8 after:w-1.5 after:-translate-x-px after:-translate-y-1/2 after:rounded-full after:bg-(--text)/24 after:transition-all hover:after:h-10 lg:block"
			/>
			<Resizable.Pane defaultSize={0} minSize={0} />
		</Resizable.PaneGroup>
	</div>
</div>
