<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import * as Tooltip from '$lib/registry/ui/tooltip/index.js';
	import { Toaster } from '$lib/registry/ui/sonner/index.js';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SiteFooter from '$lib/components/site-footer.svelte';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="light" />
<Toaster />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="relative z-10 flex min-h-svh flex-col">
	<SiteHeader />
	<main class="flex flex-1 flex-col">
		<Tooltip.Provider>
			{@render children()}
		</Tooltip.Provider>
	</main>
	<SiteFooter />
</div>
