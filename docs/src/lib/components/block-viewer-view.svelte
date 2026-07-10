<script lang="ts">
	import Icon from '@iconify/svelte';
	import { BlockViewerContext } from './block-viewer.svelte';
	import * as Resizable from '$lib/registry/ui/resizable/index.js';
	import BlockViewerIframe from './block-viewer-iframe.svelte';

	const ctx = BlockViewerContext.get();
</script>

<!-- Small screens: link out to the full-screen view instead of a resizable iframe. -->
<div
	class="flex flex-col items-start gap-3 rounded-3xl border border-(--text)/8 bg-(--bg) p-6 lg:hidden"
>
	<p class="text-sm font-medium tracking-[-0.39px]">{ctx.item.name}</p>
	{#if ctx.item.description}
		<p class="text-sm tracking-[-0.39px] text-(--text)/56">{ctx.item.description}</p>
	{/if}
	<a
		href="/view/{ctx.item.name}"
		target="_blank"
		rel="noreferrer"
		class="inline-flex h-9 items-center gap-2 rounded-3xl bg-(--text) px-3.5 text-sm font-medium text-(--bg) hover:bg-(--text)/90"
	>
		Open preview
		<Icon icon="heroicons:arrow-top-right-on-square-solid" class="size-3.5" aria-hidden="true" />
	</a>
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
				class="relative z-20 hidden w-3 bg-transparent p-0 after:absolute after:end-0 after:top-1/2 after:h-8 after:w-1.5 after:-translate-x-px after:-translate-y-1/2 after:rounded-full after:bg-(--text)/24 after:transition-all hover:after:h-10 hover:after:bg-(--text)/40 lg:block"
			/>
			<Resizable.Pane defaultSize={0} minSize={0} />
		</Resizable.PaneGroup>
	</div>
</div>
