<script lang="ts">
	import { page } from '$app/stores';

	let { title, description }: { title: string; description: string } = $props();

	const SITE = 'lily';
	const BASE = 'https://lily-svelte.pages.dev';

	// "Button" -> "Button · lily"; a title that already mentions lily is used as-is.
	const fullTitle = $derived(title.toLowerCase().includes(SITE) ? title : `${title} · ${SITE}`);
	const url = $derived(BASE + $page.url.pathname);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
</svelte:head>
