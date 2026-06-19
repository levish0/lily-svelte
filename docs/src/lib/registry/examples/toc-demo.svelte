<script lang="ts">
	import { Toc } from '$lib/registry/ui/toc';

	let scroller = $state<HTMLElement>();

	const sections = [
		{ id: 'tocdemo-introduction', title: 'Introduction' },
		{ id: 'tocdemo-installation', title: 'Installation' },
		{ id: 'tocdemo-usage', title: 'Usage' },
		{ id: 'tocdemo-styling', title: 'Styling' },
		{ id: 'tocdemo-motion', title: 'Motion' },
		{ id: 'tocdemo-accessibility', title: 'Accessibility' },
		{ id: 'tocdemo-faq', title: 'FAQ' }
	];

	const toc = sections.map((s) => ({ title: s.title, url: `#${s.id}` }));

	const filler =
		'A copy-paste component library with one unified, soft, rounded style. Scroll this panel and watch the outline on the right bring the current section into focus.';
</script>

<div class="flex w-full max-w-xl gap-6">
	<div
		bind:this={scroller}
		class="no-scrollbar h-64 flex-1 overflow-y-auto rounded-3xl bg-(--bg-elevated) p-5"
	>
		{#each sections as s (s.id)}
			<h3 id={s.id} class="scroll-mt-5 text-base font-medium tracking-[-0.48px]">{s.title}</h3>
			<p class="mt-2 mb-6 text-sm leading-[1.7] tracking-[-0.39px] text-(--text)/56">{filler}</p>
		{/each}
	</div>
	<Toc {toc} root={scroller} offset={32} title="" numbered class="w-36 shrink-0 self-center" />
</div>
