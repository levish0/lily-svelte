<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types.js';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';

	let { data }: PageProps = $props();

	let codeOpen = $state<Record<string, boolean>>({});

	const clipboard = new UseClipboard();
	let copiedName = $state<string | null>(null);

	function copyCommand(name: string) {
		clipboard.copy(`npx lily-svelte@latest add ${name}`);
		copiedName = name;
	}

	const iconButton =
		'inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)';
</script>

<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
	{#each data.charts as chart (chart.name)}
		<div class="flex min-w-0 flex-col gap-2">
			<div class="flex items-center gap-1 px-1">
				<p class="flex-1 truncate font-mono text-xs text-(--text)/56">{chart.name}</p>
				<button
					type="button"
					title="Copy install command"
					class={iconButton}
					onclick={() => copyCommand(chart.name)}
				>
					{#if clipboard.copied && copiedName === chart.name}
						<Icon icon="heroicons:check-solid" class="size-4" aria-hidden="true" />
					{:else}
						<Icon icon="heroicons:command-line-solid" class="size-4" aria-hidden="true" />
					{/if}
					<span class="sr-only">Copy install command</span>
				</button>
				<button
					type="button"
					title={codeOpen[chart.name] ? 'Show chart' : 'Show code'}
					class="{iconButton} {codeOpen[chart.name] ? 'bg-(--text)/8 text-(--text)' : ''}"
					onclick={() => (codeOpen[chart.name] = !codeOpen[chart.name])}
				>
					<Icon icon="heroicons:code-bracket-solid" class="size-4" aria-hidden="true" />
					<span class="sr-only">Toggle code</span>
				</button>
			</div>
			{#if codeOpen[chart.name]}
				<div
					class="code-block h-[26rem] overflow-y-auto rounded-3xl border border-(--text)/8 bg-(--bg-elevated) text-[13px] leading-relaxed [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:px-5 [&_pre]:py-4 [&_pre]:outline-none"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html chart.files[0]?.highlightedContent}
				</div>
			{:else}
				<div
					class="flex h-[26rem] items-center rounded-3xl border border-(--text)/8 bg-(--bg) p-4"
				>
					<chart.component />
				</div>
			{/if}
		</div>
	{/each}
</div>
