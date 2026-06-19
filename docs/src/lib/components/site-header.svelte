<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { toggleMode, mode } from 'mode-watcher';
	import MobileNav from '$lib/components/mobile-nav.svelte';
	import SiteSearch from '$lib/components/site-search.svelte';

	const nav = [
		{ label: 'Home', href: '/' },
		{ label: 'Docs', href: '/docs' },
		{ label: 'Components', href: '/docs/components/accordion' }
	];

	function isActive(href: string) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-(--text)/8 bg-(--bg)/80 backdrop-blur-md">
	<div class="mx-auto flex h-14 max-w-[88rem] items-center gap-2 px-6 md:gap-6 lg:px-8">
		<MobileNav />

		<nav class="hidden items-center gap-1 md:flex">
			{#each nav as { label, href } (href)}
				<a
					{href}
					class="rounded-xl px-3 py-1.5 text-sm tracking-[-0.39px] transition-colors duration-150
						{isActive(href) ? 'text-(--text)' : 'text-(--text)/56 hover:text-(--text)'}"
				>
					{label}
				</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-2">
			<div class="hidden sm:block">
				<SiteSearch />
			</div>
			<a
				href="https://github.com/levish0/lily-svelte"
				target="_blank"
				rel="noreferrer"
				aria-label="GitHub"
				class="inline-flex size-9 items-center justify-center rounded-xl text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/5 hover:text-(--text)"
			>
				<svg class="size-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56v-2.01c-3.34.71-4.04-1.59-4.04-1.59-.55-1.38-1.34-1.74-1.34-1.74-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.82 0-1.29.47-2.34 1.24-3.16-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.82 1.24 1.87 1.24 3.16 0 4.52-2.81 5.51-5.49 5.81.43.37.81 1.1.81 2.22v3.29c0 .31.22.68.83.56C20.56 21.91 24 17.5 24 12.29 24 5.78 18.63.5 12 .5Z"
					/>
				</svg>
			</a>
			<button
				onclick={toggleMode}
				aria-label="Toggle theme"
				class="inline-flex size-9 items-center justify-center rounded-xl text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/5 hover:text-(--text)"
			>
				{#if mode.current === 'dark'}
					<Icon icon="heroicons:sun-solid" class="size-4.5" aria-hidden="true" />
				{:else}
					<Icon icon="heroicons:moon-solid" class="size-4.5" aria-hidden="true" />
				{/if}
			</button>
		</div>
	</div>
</header>
