<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { siteStyle } from '$lib/site-style.svelte.js';
	import { page } from '$app/state';
	import { setDesignStyle, isStyle, DEFAULT_STYLE, type StyleName } from '$lib/design-style';
	const selectedStyle = $state<{ current: StyleName }>({ current: DEFAULT_STYLE });
	setDesignStyle(selectedStyle);
	onMount(() => {
		let saved: string | null = null;
		try {
			saved = localStorage.getItem('lily-design-style');
		} catch {
			/* Optional persistence. */
		}
		const requested = page.url.searchParams.get('style');
		selectedStyle.current = isStyle(page.params.style)
			? page.params.style
			: isStyle(requested)
				? requested
				: isStyle(saved)
					? saved
					: DEFAULT_STYLE;
	});
	$effect(() => {
		siteStyle.current = selectedStyle.current;
		document.documentElement.dataset.lilyStyle = selectedStyle.current;
	});
	import '$lib/icons';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/registry/ui/sonner/index.js';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="light" />
<Toaster />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}
