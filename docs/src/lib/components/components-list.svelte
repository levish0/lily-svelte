<script lang="ts">
	import { docsNav } from '$lib/config/docs-nav.js';

	const items = $derived(docsNav.find((s) => s.title === 'Components')?.items ?? []);
</script>

<div class="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
	{#each items as item (item.href)}
		<a
			href={item.href}
			class="link w-fit text-base tracking-[-0.39px] text-(--text)/72 hover:text-(--text)"
		>
			{item.title}
		</a>
	{/each}
</div>
