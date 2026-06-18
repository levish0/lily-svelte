<script lang="ts">
	import { cn } from '$lib/utils.js';

	type TocItem = { title: string; url: string; items?: TocItem[] };

	let { toc }: { toc: TocItem[] } = $props();

	function flatten(items: TocItem[], depth = 0): { title: string; url: string; depth: number }[] {
		return items.flatMap((item) => [
			{ title: item.title, url: item.url, depth },
			...(item.items ? flatten(item.items, depth + 1) : [])
		]);
	}

	const flat = $derived(flatten(toc));
	let activeId = $state<string>('');

	$effect(() => {
		const ids = flat.map((i) => i.url.replace(/^#/, ''));
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{ rootMargin: '0px 0px -75% 0px', threshold: 1 }
		);

		for (const el of elements) observer.observe(el);
		return () => observer.disconnect();
	});
</script>

{#if flat.length}
	<p class="pb-2 text-xs font-medium tracking-[-0.3px] text-(--text)/36">On this page</p>
	<ul class="flex flex-col gap-2 text-sm tracking-[-0.39px]">
		{#each flat as item (item.url)}
			<li style="padding-inline-start: {item.depth * 0.75}rem">
				<a
					href={item.url}
					class={cn(
						'transition-colors duration-150 hover:text-(--text)',
						activeId === item.url.replace(/^#/, '')
							? 'font-medium text-(--text)'
							: 'text-(--text)/48'
					)}
				>
					{item.title}
				</a>
			</li>
		{/each}
	</ul>
{/if}
