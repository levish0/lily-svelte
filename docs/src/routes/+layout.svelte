<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { page } from '$app/stores';

	let { children } = $props();

	const components = [
		{ name: 'Button', href: '/button' },
		{ name: 'Card', href: '/card' },
		{ name: 'Badge', href: '/badge' },
		{ name: 'Avatar', href: '/avatar' },
		{ name: 'Separator', href: '/separator' }
	];
</script>

<ModeWatcher defaultMode="light" />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen">
	<aside
		class="sticky top-0 flex h-screen w-56 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-(--text)/8 px-3 py-6"
	>
		<a href="/" class="mb-4 px-3 text-base font-semibold tracking-[-0.48px]">lily</a>
		<p class="px-3 pb-1 text-xs tracking-[-0.3px] text-(--text)/36">Components</p>
		{#each components as { name, href } (href)}
			<a
				{href}
				class="rounded-xl px-3 py-1.5 text-sm tracking-[-0.39px] transition-colors duration-150
					{$page.url.pathname === href
					? 'bg-(--text)/8 font-medium text-(--text)'
					: 'text-(--text)/48 hover:bg-(--text)/4 hover:text-(--text)'}"
			>
				{name}
			</a>
		{/each}

		<button
			onclick={toggleMode}
			class="mt-auto rounded-xl px-3 py-1.5 text-left text-sm tracking-[-0.39px] text-(--text)/36 transition-colors duration-150 hover:text-(--text)"
		>
			{mode.current === 'dark' ? '☀ light' : '☾ dark'}
		</button>
	</aside>

	<main class="flex-1 overflow-y-auto px-10 py-10">
		{@render children()}
	</main>
</div>
