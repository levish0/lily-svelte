<script lang="ts">
	import { page } from '$app/stores';
	import DocsToc from '$lib/components/docs-toc.svelte';
	import { Badge } from '$lib/registry/ui/badge';
	import { Button } from '$lib/registry/ui/button';
	import { findNeighbors } from '$lib/config/docs-nav.js';

	let { data } = $props();

	const Markdown = $derived(data.component);
	const doc = $derived(data.metadata);
	const sourceLink = $derived(doc.links?.source);
	const apiLink = $derived(doc.links?.api);
	const neighbors = $derived(findNeighbors($page.url.pathname));
</script>

<svelte:head>
	<title>{doc.title} · lily</title>
	<meta name="description" content={doc.description} />
</svelte:head>

<div class="flex justify-between gap-12">
	<article class="min-w-0 max-w-3xl flex-1">
		<div class="flex flex-col gap-2">
			<h1 class="text-3xl font-semibold tracking-[-0.96px]">{doc.title}</h1>
			{#if doc.description}
				<p class="text-base leading-[1.6] tracking-[-0.48px] text-balance text-(--text)/56">
					{doc.description}
				</p>
			{/if}
		</div>

		{#if sourceLink || apiLink}
			<div class="flex flex-wrap items-center gap-2 pt-4">
				{#if sourceLink}
					<Badge href={sourceLink} target="_blank" rel="noreferrer">Source ↗</Badge>
				{/if}
				{#if apiLink}
					<Badge href={apiLink} target="_blank" rel="noreferrer">API ↗</Badge>
				{/if}
			</div>
		{/if}

		<div class="mt-8">
			<Markdown />
		</div>

		{#if neighbors.previous || neighbors.next}
			<div class="mt-14 flex items-center gap-3 border-t border-(--text)/8 pt-6">
				{#if neighbors.previous}
					<Button variant="ghost" size="sm" href={neighbors.previous.href}>
						← {neighbors.previous.title}
					</Button>
				{/if}
				{#if neighbors.next}
					<Button variant="ghost" size="sm" class="ms-auto" href={neighbors.next.href}>
						{neighbors.next.title} →
					</Button>
				{/if}
			</div>
		{/if}
	</article>

	<aside
		class="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-52 shrink-0 overflow-y-auto py-1 xl:block"
	>
		<DocsToc toc={doc.toc} />
	</aside>
</div>
