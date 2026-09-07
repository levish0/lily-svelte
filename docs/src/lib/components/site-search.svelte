<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import Button from './docs-button.svelte';
	import { Dialog, DialogContent, DialogTitle, DialogDescription } from '$lib/registry/ui/dialog';
	import * as Command from '$lib/registry/ui/command';
	import { Kbd } from '$lib/registry/ui/kbd';
	import { docsNav } from '$lib/config/docs-nav.js';
	let open = $state(false);
	function handleKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			open = !open;
		}
	}
	function select(href: string) {
		open = false;
		goto(href);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<Button
	size="md"
	diamondClass="h-9 w-72 rounded-2xl bg-(--text)/5 px-3.5 text-sm tracking-[-0.39px] text-(--text)/40 hover:bg-(--text)/8 hover:text-(--text)/40"
	variant="soft"
	tone="neutral"
	onclick={() => (open = true)}
	aria-label="Search documentation"
	class="w-56 gap-2 lg:w-72"
>
	<Icon icon="heroicons:magnifying-glass-solid" class="size-4 shrink-0" aria-hidden="true" />
	<span class="flex-1 truncate text-left">Search documentation…</span>
	<Kbd class="shrink-0">⌘K</Kbd>
</Button>

<Dialog bind:open>
	<DialogContent
		showCloseButton={false}
		class="top-24 max-w-lg translate-y-0 gap-0 overflow-hidden p-0"
	>
		<DialogTitle class="sr-only">Search documentation</DialogTitle>
		<DialogDescription class="sr-only"
			>Search pages, use arrow keys to navigate, and Enter to open a result.</DialogDescription
		>
		<Command.Root loop>
			<Command.Input aria-label="Search documentation pages" placeholder="Search documentation…" />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				{#each docsNav as section (section.title)}
					<Command.Group heading={section.title}>
						{#each section.items as item (item.href)}
							<Command.Item
								value={item.href}
								keywords={[item.title, section.title]}
								onSelect={() => select(item.href)}>{item.title}</Command.Item
							>
						{/each}
					</Command.Group>
				{/each}
			</Command.List>
		</Command.Root>
	</DialogContent>
</Dialog>
