<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { Dialog, DialogContent } from '$lib/registry/ui/dialog';
	import { Kbd } from '$lib/registry/ui/kbd';
	import { docsNav } from '$lib/config/docs-nav.js';

	let open = $state(false);
	let query = $state('');
	let inputEl = $state<HTMLInputElement>();

	type Result = { title: string; href: string; section: string };
	const allItems: Result[] = docsNav.flatMap((s) =>
		s.items.map((i) => ({ title: i.title, href: i.href, section: s.title }))
	);

	const results = $derived(
		query.trim()
			? allItems.filter((i) => i.title.toLowerCase().includes(query.trim().toLowerCase()))
			: allItems
	);

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open = true;
		}
	}

	function select(href: string) {
		open = false;
		query = '';
		goto(href);
	}

	$effect(() => {
		if (open) {
			query = '';
			// focus the input once the dialog mounts
			setTimeout(() => inputEl?.focus(), 0);
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<button
	type="button"
	onclick={() => (open = true)}
	class="inline-flex h-9 w-72 items-center gap-2 rounded-2xl bg-(--text)/5 px-3.5 text-sm tracking-[-0.39px] text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8"
>
	<Icon icon="heroicons:magnifying-glass-solid" class="size-4 shrink-0" aria-hidden="true" />
	<span class="flex-1 text-left whitespace-nowrap">Search documentation…</span>
	<Kbd class="shrink-0">⌘K</Kbd>
</button>

<Dialog bind:open>
	<DialogContent showCloseButton={false} class="top-24 max-w-lg translate-y-0 gap-0 p-0">
		<div class="flex items-center gap-2 border-b border-(--text)/8 px-4">
			<Icon
				icon="heroicons:magnifying-glass-solid"
				class="size-4.5 shrink-0 text-(--text)/40"
				aria-hidden="true"
			/>
			<input
				bind:this={inputEl}
				bind:value={query}
				placeholder="Search documentation..."
				class="h-12 flex-1 bg-transparent text-sm tracking-[-0.39px] outline-none placeholder:text-(--text)/40"
			/>
		</div>
		<div class="max-h-80 overflow-y-auto p-2">
			{#if results.length === 0}
				<p class="px-3 py-6 text-center text-sm text-(--text)/40">No results found.</p>
			{:else}
				{#each results as item (item.href)}
					<button
						type="button"
						onclick={() => select(item.href)}
						class="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm tracking-[-0.39px] transition-colors duration-100 hover:bg-(--text)/8"
					>
						<span>{item.title}</span>
						<span class="text-xs text-(--text)/40">{item.section}</span>
					</button>
				{/each}
			{/if}
		</div>
	</DialogContent>
</Dialog>
