<script lang="ts">
	import './layout.css';
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
