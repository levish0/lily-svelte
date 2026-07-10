<script lang="ts">
	import Icon from '@iconify/svelte';
	import { BlockViewerContext } from './block-viewer.svelte';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import { Tabs, TabsList, TabsTrigger } from '$lib/registry/ui/tabs';
	import { Separator } from '$lib/registry/ui/separator/index.js';
	import { ToggleGroup, ToggleGroupItem } from '$lib/registry/ui/toggle-group';

	const ctx = BlockViewerContext.get();

	const clipboard = new UseClipboard();

	const command = $derived(`npx lily-svelte@latest add ${ctx.item.name}`);

	const iconButton =
		'inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)';
</script>

<div class="hidden w-full items-center gap-2 lg:flex">
	<Tabs bind:value={ctx.view}>
		<TabsList>
			<TabsTrigger value="preview">Preview</TabsTrigger>
			<TabsTrigger value="code">Code</TabsTrigger>
		</TabsList>
	</Tabs>
	<Separator orientation="vertical" class="mx-1 h-4!" />
	<a
		href="#{ctx.item.name}"
		class="flex-1 truncate text-sm tracking-[-0.39px] text-(--text)/72 transition-colors duration-150 hover:text-(--text)"
	>
		{ctx.item.description?.replace(/\.$/, '')}
	</a>
	<div class="ms-auto flex items-center gap-2">
		<div class="flex h-9 items-center gap-1 rounded-xl bg-(--text)/5 px-1">
			<ToggleGroup
				type="single"
				value="100"
				onValueChange={(value) => {
					if (value && ctx.resizablePaneRef) {
						ctx.resizablePaneRef.resize(parseInt(value));
					}
				}}
				class="gap-1"
			>
				<ToggleGroupItem value="100" title="Desktop" class="size-7 rounded-lg p-0">
					<Icon icon="heroicons:computer-desktop-solid" class="size-4" aria-hidden="true" />
				</ToggleGroupItem>
				<ToggleGroupItem value="60" title="Tablet" class="size-7 rounded-lg p-0">
					<Icon icon="heroicons:device-tablet-solid" class="size-4" aria-hidden="true" />
				</ToggleGroupItem>
				<ToggleGroupItem value="30" title="Mobile" class="size-7 rounded-lg p-0">
					<Icon icon="heroicons:device-phone-mobile-solid" class="size-4" aria-hidden="true" />
				</ToggleGroupItem>
			</ToggleGroup>
			<Separator orientation="vertical" class="h-4!" />
			<a
				href="/view/{ctx.item.name}"
				target="_blank"
				rel="noreferrer"
				title="Open in New Tab"
				class={iconButton}
			>
				<span class="sr-only">Open in New Tab</span>
				<Icon icon="heroicons:arrow-top-right-on-square-solid" class="size-4" aria-hidden="true" />
			</a>
			<button
				type="button"
				title="Refresh Preview"
				class={iconButton}
				onclick={() => {
					ctx.iframeKey = ctx.iframeKey + 1;
				}}
			>
				<Icon icon="heroicons:arrow-path-solid" class="size-4" aria-hidden="true" />
				<span class="sr-only">Refresh Preview</span>
			</button>
		</div>
		<button
			type="button"
			class="inline-flex h-9 items-center gap-2 rounded-xl bg-(--text)/5 px-3 font-mono text-xs text-(--text)/72 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
			onclick={() => clipboard.copy(command)}
		>
			{#if clipboard.copied}
				<Icon icon="heroicons:check-solid" class="size-3.5" aria-hidden="true" />
			{:else}
				<Icon icon="heroicons:command-line-solid" class="size-3.5" aria-hidden="true" />
			{/if}
			<span class="hidden xl:inline">{command}</span>
		</button>
	</div>
</div>
