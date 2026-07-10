<script lang="ts">
	import Icon from '@iconify/svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { cn } from '$lib/utils.js';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import * as Drawer from '$lib/registry/ui/drawer/index.js';
	import * as Sheet from '$lib/registry/ui/sheet/index.js';
	import type { Snippet } from 'svelte';
	import type { HighlightedBlock } from '../../routes/api/block/[block]/+server.js';

	const isDesktop = new MediaQuery('min-width: 768px');

	let { chart, code, children }: { chart: HighlightedBlock; code: string; children?: Snippet } =
		$props();

	const clipboard = new UseClipboard();
</script>

{#snippet Content()}
	<div class="flex min-h-0 flex-1 flex-col">
		<div
			class="hidden shrink-0 border-b border-(--text)/8 p-4 sm:block **:data-chart:mx-auto **:data-chart:max-h-[35vh] [&>div]:shadow-none"
		>
			{@render children?.()}
		</div>
		<figure class="mx-0 my-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
			<figcaption
				class="flex h-12 shrink-0 items-center gap-2 border-b border-(--text)/8 px-4 text-sm tracking-[-0.39px] text-(--text)/72"
			>
				<Icon icon="heroicons:document-solid" class="size-4 text-(--text)/40" aria-hidden="true" />
				{chart.name}.svelte
				<div class="ms-auto flex items-center gap-2">
					<button
						type="button"
						aria-label="Copy code"
						class="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
						onclick={() => clipboard.copy(code)}
					>
						{#if clipboard.copied}
							<Icon icon="heroicons:check-solid" class="size-3.5" aria-hidden="true" />
						{:else}
							<Icon icon="heroicons:clipboard-solid" class="size-3.5" aria-hidden="true" />
						{/if}
					</button>
				</div>
			</figcaption>
			<div
				class="code-block no-scrollbar overflow-y-auto text-[13px] leading-relaxed [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:px-5 [&_pre]:py-4 [&_pre]:outline-none"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html chart.files?.[0]?.highlightedContent ?? ''}
			</div>
		</figure>
	</div>
{/snippet}

{#snippet Trigger({ props }: { props: Record<string, unknown> })}
	<button
		type="button"
		{...props}
		class={cn(
			'inline-flex h-7 items-center rounded-lg bg-(--text)/5 px-2.5 text-xs font-medium tracking-[-0.3px] text-(--text)/72 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)',
			props.class as string
		)}
	>
		View Code
	</button>
{/snippet}

{#if !isDesktop.current}
	<Drawer.Root>
		<Drawer.Trigger>
			{#snippet child({ props })}
				{@render Trigger({ props })}
			{/snippet}
		</Drawer.Trigger>
		<Drawer.Content class="flex max-h-[80vh] flex-col">
			<Drawer.Header class="sr-only">
				<Drawer.Title>Code</Drawer.Title>
				<Drawer.Description>View the code for the chart.</Drawer.Description>
			</Drawer.Header>
			<div class="flex h-full min-h-0 flex-col overflow-auto">
				{@render Content()}
			</div>
		</Drawer.Content>
	</Drawer.Root>
{:else}
	<Sheet.Root>
		<Sheet.Trigger>
			{#snippet child({ props })}
				{@render Trigger({ props })}
			{/snippet}
		</Sheet.Trigger>
		<Sheet.Content
			side="right"
			class="flex w-full flex-col gap-0 p-0 sm:max-w-sm md:w-[700px] md:max-w-[700px]"
		>
			<Sheet.Header class="sr-only">
				<Sheet.Title>Code</Sheet.Title>
				<Sheet.Description>View the code for the chart.</Sheet.Description>
			</Sheet.Header>
			{@render Content()}
		</Sheet.Content>
	</Sheet.Root>
{/if}
