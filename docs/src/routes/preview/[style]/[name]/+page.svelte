<script lang="ts">
	import { onMount } from 'svelte';
	import { TooltipProvider } from '$lib/registry/ui/tooltip';
	import { setMode } from 'mode-watcher';
	import { page } from '$app/state';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const previewHeight = $derived(
		Math.max(320, Math.min(3000, Number(page.url.searchParams.get('height')) || 930))
	);
	const Example = $derived(data.component);
	let hydrated = $state(false);
	onMount(() => {
		hydrated = true;
		document.documentElement.dataset.lilyStyle = data.style;
		const requestedMode = page.url.searchParams.get('mode');
		if (requestedMode === 'light' || requestedMode === 'dark') setMode(requestedMode);
	});
</script>

<svelte:head><title>{data.name} · {data.style} · Lily</title></svelte:head>
<main
	class={page.url.searchParams.get('layout') === 'full'
		? 'w-full'
		: `flex w-full items-center justify-center p-6 ${page.url.searchParams.get('embedded') === 'true' ? 'min-h-80' : 'min-h-screen'}`}
	data-preview-style={data.style}
	data-preview-ready={hydrated}
	data-preview-layout={page.url.searchParams.get('layout')}
	style:--preview-min-height={`${previewHeight}px`}
>
	<TooltipProvider><Example /></TooltipProvider>
</main>

<style>
	:global([data-preview-layout='full'] .min-h-svh),
	:global([data-preview-layout='full'] .min-h-screen),
	:global([data-preview-layout='full'] .min-h-\[100vh\]) {
		min-height: var(--preview-min-height);
	}
	@media (min-width: 768px) {
		:global([data-preview-layout='full'] .md\:min-h-min) {
			min-height: min-content;
		}
	}
</style>
