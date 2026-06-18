<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { docsNav } from '$lib/config/docs-nav.js';

	let open = $state(false);

	afterNavigate(() => (open = false));

	function isActive(href: string) {
		return $page.url.pathname === href;
	}

	/** Move the panel to <body> so the header's `backdrop-blur` (which creates a
	 * containing block) doesn't trap `position: fixed`. */
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

	// Lock body scroll while the menu is open.
	$effect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	});
</script>

<button
	type="button"
	aria-label="Toggle menu"
	aria-expanded={open}
	onclick={() => (open = !open)}
	class="inline-flex size-9 items-center justify-center rounded-xl text-(--text)/48 transition-colors duration-150 hover:bg-(--text)/4 hover:text-(--text) md:hidden"
>
	{#if open}
		<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
			<path d="M6 6l12 12M18 6 6 18" />
		</svg>
	{:else}
		<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
			<path d="M3 6h18M3 12h18M3 18h18" />
		</svg>
	{/if}
</button>

{#if open}
	<div
		use:portal
		class="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-(--bg) px-5 py-6 md:hidden"
	>
		<nav class="mx-auto flex max-w-6xl flex-col gap-6">
			{#each docsNav as section (section.title)}
				<div class="flex flex-col gap-1">
					<p class="px-3 pb-1 text-xs font-medium tracking-[-0.3px] text-(--text)/36">
						{section.title}
					</p>
					{#each section.items as item (item.href)}
						<a
							href={item.href}
							class="rounded-xl px-3 py-2 text-sm tracking-[-0.39px] transition-colors duration-150
								{isActive(item.href)
								? 'bg-(--text)/8 font-medium text-(--text)'
								: 'text-(--text)/56 hover:bg-(--text)/4 hover:text-(--text)'}"
						>
							{item.title}
						</a>
					{/each}
				</div>
			{/each}
		</nav>
	</div>
{/if}
