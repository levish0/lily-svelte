<script lang="ts">
	import { page } from '$app/stores';
	import Seo from '$lib/components/seo.svelte';
	import { chartCategories } from '$lib/registry/registry-categories.js';

	let { children } = $props();

	const tabs = chartCategories
		.filter((category) => !category.hidden)
		.map((category) => ({ name: category.name, href: `/charts/${category.slug}` }));
</script>

<Seo
	title="Charts · lily"
	description="Beautiful charts built with lily and LayerChart. Copy and paste into your apps."
/>

<div class="mx-auto w-full max-w-[88rem] flex-1 px-6 py-10 lg:px-8">
	<div class="mb-8 flex max-w-2xl flex-col gap-3">
		<h1 class="text-3xl font-bold tracking-[-0.75px]">Charts</h1>
		<p class="text-base tracking-[-0.45px] text-(--text)/56">
			Beautiful charts built with lily and
			<a href="https://layerchart.com" target="_blank" rel="noreferrer" class="link text-(--text)">
				LayerChart</a
			>. Copy the source, or install one with the CLI.
		</p>
	</div>

	<nav class="mb-10 flex items-center gap-1 overflow-x-auto">
		{#each tabs as tab (tab.href)}
			<a
				href={tab.href}
				class="shrink-0 rounded-full px-4 py-2 text-sm tracking-[-0.39px] transition-colors duration-150
					{$page.url.pathname === tab.href
					? 'bg-(--text)/8 font-medium text-(--text)'
					: 'text-(--text)/56 hover:text-(--text)'}"
			>
				{tab.name}
			</a>
		{/each}
	</nav>

	{@render children()}
</div>
