<script lang="ts">
	import { page } from '$app/stores';
	import { docsNav } from '$lib/config/docs-nav.js';

	let { children } = $props();

	function isActive(href: string) {
		return $page.url.pathname === href;
	}
</script>

<div class="mx-auto flex w-full max-w-[88rem] flex-1 gap-8 px-6 lg:px-8">
	<aside
		class="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto py-10 md:block"
	>
		<nav class="flex flex-col gap-6">
			{#each docsNav as section (section.title)}
				<div class="flex flex-col gap-1">
					<p class="px-3 pb-1 text-xs font-medium tracking-[-0.3px] text-(--text)/36">
						{section.title}
					</p>
					{#each section.items as item (item.href)}
						<a
							href={item.href}
							class="rounded-xl px-3 py-1.5 text-sm tracking-[-0.39px] transition-colors duration-150
								{isActive(item.href)
								? 'bg-(--text)/8 font-medium text-(--text)'
								: 'text-(--text)/48 hover:bg-(--text)/4 hover:text-(--text)'}"
						>
							{item.title}
						</a>
					{/each}
				</div>
			{/each}
		</nav>
	</aside>

	<div class="min-w-0 flex-1 py-10">
		{@render children()}
	</div>
</div>
