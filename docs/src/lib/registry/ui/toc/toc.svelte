<script lang="ts" module>
	export type TocItem = { title: string; url: string; items?: TocItem[] };
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		toc,
		title = 'On this page',
		numbered = false,
		offset = 100,
		root = undefined,
		class: className
	}: {
		toc: TocItem[];
		title?: string;
		/** Prefix each item with a 1.1-style outline number. */
		numbered?: boolean;
		/** Distance from the top (px) that counts as "current". */
		offset?: number;
		/** Scroll container to spy on. Defaults to the window. */
		root?: HTMLElement;
		class?: string;
	} = $props();

	function flatten(items: TocItem[], depth = 0): { title: string; url: string; depth: number }[] {
		return items.flatMap((item) => [
			{ title: item.title, url: item.url, depth },
			...(item.items ? flatten(item.items, depth + 1) : [])
		]);
	}

	const flat = $derived(flatten(toc));
	let navEl: HTMLElement | undefined = $state();
	let activeId = $state<string>('');

	const activeIdx = $derived(
		activeId ? flat.findIndex((i) => i.url.replace(/^#/, '') === activeId) : -1
	);

	// Outline numbering (1, 1.1, 1.1.1 …) derived from heading depth.
	const numbering = $derived.by(() => {
		if (!numbered || !flat.length) return [] as string[];
		const minDepth = Math.min(...flat.map((h) => h.depth));
		const counters: Record<number, number> = {};
		return flat.map((h) => {
			counters[h.depth] = (counters[h.depth] ?? 0) + 1;
			for (const d of Object.keys(counters)
				.map(Number)
				.filter((d) => d > h.depth))
				counters[d] = 0;
			const parts: number[] = [];
			for (let d = minDepth; d <= h.depth; d++) parts.push(counters[d] ?? 0);
			return parts.join('.');
		});
	});

	// Proximity focus: the active item blooms, neighbours shrink and fade by distance.
	const spring = 'cubic-bezier(0.34,1.56,0.64,1)';
	function fontSize(i: number): number {
		if (activeIdx < 0) return 12.5;
		const d = Math.abs(i - activeIdx);
		return d === 0 ? 15 : d === 1 ? 12.5 : d === 2 ? 12 : 11.5;
	}
	function opacity(i: number): number {
		if (activeIdx < 0) return 0.38;
		const d = Math.abs(i - activeIdx);
		return d === 0 ? 1 : d === 1 ? 0.48 : d === 2 ? 0.3 : 0.2;
	}

	function update() {
		const scrollTop = root ? root.scrollTop : window.scrollY;
		const containerTop = root ? root.getBoundingClientRect().top : 0;
		const y = scrollTop + offset;
		let active = '';
		for (const item of flat) {
			const el = document.getElementById(item.url.replace(/^#/, ''));
			if (!el) continue;
			const top = root
				? el.getBoundingClientRect().top - containerTop + scrollTop
				: el.getBoundingClientRect().top + window.scrollY;
			if (top <= y) active = el.id;
		}
		activeId = active;
	}

	$effect(() => {
		const target: HTMLElement | Window = root ?? window;
		update();
		target.addEventListener('scroll', update, { passive: true });
		return () => target.removeEventListener('scroll', update);
	});

	// Keep the active item scrolled into view within the TOC.
	$effect(() => {
		if (activeIdx >= 0 && navEl) {
			navEl
				.querySelectorAll('a')
				[activeIdx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		}
	});
</script>

{#if flat.length}
	<div data-slot="toc" class={cn('flex flex-col', className)}>
		{#if title}
			<p class="pb-2 text-xs font-medium tracking-[-0.3px] text-(--text)/40">{title}</p>
		{/if}
		<nav bind:this={navEl} class="no-scrollbar flex max-h-[60vh] flex-col overflow-y-auto">
			{#each flat as item, i (item.url)}
				<a
					href={item.url}
					style="font-size:{fontSize(i)}px;opacity:{opacity(i)};font-weight:{activeIdx === i
						? 500
						: 400};padding-block:{activeIdx === i ? 5 : 3}px;padding-inline-start:{item.depth *
						0.75}rem;color:var(--text);transition:font-size 0.3s {spring},opacity 0.2s ease,padding 0.3s {spring};"
					class="block leading-[1.5] tracking-[-0.3px]"
				>
					{#if numbered}<span class="me-1.5 opacity-40">{numbering[i]}</span>{/if}{item.title}
				</a>
			{/each}
		</nav>
	</div>
{/if}
