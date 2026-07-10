<script lang="ts">
	import { page } from '$app/stores';
	import Seo from '$lib/components/seo.svelte';
	import { registryCategories } from '$lib/registry/registry-categories.js';

	let { children } = $props();

	const tabs = [
		{ name: 'Featured', href: '/blocks' },
		...registryCategories
			.filter((category) => !category.hidden)
			.map((category) => ({ name: category.name, href: `/blocks/${category.slug}` }))
	];

	function isActive(href: string) {
		if (href === '/blocks') return $page.url.pathname === '/blocks';
		return $page.url.pathname === href;
	}
</script>

<Seo
	title="Blocks · lily"
	description="Ready-made blocks built with lily components. Copy and paste into your apps."
/>

<div class="mx-auto w-full max-w-[88rem] flex-1 px-6 py-10 lg:px-8">
	<div class="mb-8 flex max-w-2xl flex-col gap-3">
		<h1 class="text-3xl font-bold tracking-[-0.75px]">Blocks</h1>
		<p class="text-base tracking-[-0.45px] text-(--text)/56">
			Ready-made blocks built with lily components. Open them full-screen, resize the preview, and
			copy the source into your apps.
		</p>
	</div>

	<div class="mb-10 flex items-center gap-2">
		<nav class="flex flex-1 items-center gap-1 overflow-x-auto">
			{#each tabs as tab (tab.href)}
				<a
					href={tab.href}
					class="shrink-0 rounded-full px-4 py-2 text-sm tracking-[-0.39px] transition-colors duration-150
						{isActive(tab.href)
						? 'bg-(--text)/8 font-medium text-(--text)'
						: 'text-(--text)/56 hover:text-(--text)'}"
				>
					{tab.name}
				</a>
			{/each}
		</nav>
		{#if $page.url.pathname === '/blocks'}
			<a
				href="/blocks/sidebar"
				class="hidden shrink-0 rounded-full bg-(--text)/5 px-4 py-2 text-sm font-medium tracking-[-0.39px] text-(--text)/72 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) sm:block"
			>
				Browse all blocks
			</a>
		{/if}
	</div>

	{@render children()}
</div>
