<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { Command } from 'package-manager-detector';
	import type { HighlighterCore } from 'shiki/core';
	import {
		PACKAGE_MANAGERS,
		getCommandText,
		type PackageManager
	} from '$lib/package-manager.js';
	import { getHighlighter } from '$lib/highlighter.js';
	import { Tabs, TabsList, TabsTrigger } from '$lib/registry/ui/tabs';
	import CopyButton from '$lib/components/copy-button.svelte';

	let {
		type = 'execute',
		command
	}: {
		/** package-manager-detector command type — `execute` (dlx) or `install` (add). */
		type?: Command;
		/** Everything after the runner, e.g. `lily-svelte@latest add button` or `vaul-svelte`. */
		command: string;
	} = $props();

	let pm = $state<PackageManager>('npm');
	const text = $derived(getCommandText(pm, type, command));

	// Highlight with the same shiki github themes as the docs code blocks.
	let highlighter = $state<HighlighterCore>();
	onMount(async () => {
		highlighter = await getHighlighter();
	});
	const html = $derived(
		highlighter?.codeToHtml(text, {
			lang: 'bash',
			themes: { light: 'github-light-default', dark: 'github-dark' },
			defaultColor: false
		})
	);
</script>

<div class="overflow-hidden rounded-3xl bg-(--text)/5">
	<div class="flex items-center gap-2 border-b border-(--text)/8 px-3 py-2">
		<Icon
			icon="heroicons:command-line-solid"
			class="size-4 shrink-0 text-(--text)/40"
			aria-hidden="true"
		/>
		<Tabs bind:value={pm}>
			<TabsList class="bg-transparent p-0">
				{#each PACKAGE_MANAGERS as p (p)}
					<TabsTrigger value={p} class="px-2.5 py-1 text-xs">{p}</TabsTrigger>
				{/each}
			</TabsList>
		</Tabs>
		<CopyButton text={text} class="static ms-auto" />
	</div>
	<div
		class="code-block no-scrollbar overflow-x-auto px-5 py-3.5 text-sm [&_pre]:m-0 [&_pre]:bg-transparent"
	>
		{#if html}{@html html}{:else}<pre class="text-(--text)/72"><code>{text}</code></pre>{/if}
	</div>
</div>
