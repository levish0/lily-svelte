<script lang="ts">
	import Button from './docs-button.svelte';
	import { getDesignStyle } from '$lib/design-style';
	const style = getDesignStyle();
	import { Sheet, SheetContent, SheetHeader, SheetTitle } from '$lib/registry/ui/sheet';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { docsNav } from '$lib/config/docs-nav.js';

	const mainNav = [
		{ title: 'Home', href: '/' },
		{ title: 'Docs', href: '/docs' },
		{ title: 'Components', href: '/docs/components' },
		{ title: 'Blocks', href: '/blocks' },
		{ title: 'Charts', href: '/charts' }
	];

	let open = $state(false);
	$effect(() => {
		if (!open || style.current !== 'diamond') return;
		const overflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = overflow;
		};
	});

	afterNavigate(() => (open = false));

	function isActive(href: string) {
		return $page.url.pathname === href;
	}
</script>

<Button
	size="icon-sm"
	diamondClass="rounded-xl"
	variant="ghost"
	tone="neutral"
	type="button"
	aria-label="Toggle menu"
	aria-expanded={open}
	onclick={() => (open = !open)}
	class="inline-flex size-9 items-center justify-center rounded-xl text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/5 hover:text-(--text) md:hidden"
>
	{#if open}
		<Icon icon="heroicons:x-mark-solid" class="size-5" aria-hidden="true" />
	{:else}
		<Icon icon="heroicons:bars-3-solid" class="size-5" aria-hidden="true" />
	{/if}
</Button>

<Sheet bind:open>
	<SheetContent
		side="left"
		preventScroll={style.current !== 'diamond'}
		showCloseButton={style.current !== 'diamond'}
		showOverlay={style.current !== 'diamond'}
		onInteractOutside={(event) => {
			if (style.current === 'diamond') event.preventDefault();
		}}
		overlayProps={style.current === 'diamond'
			? { class: 'bg-transparent backdrop-blur-none pointer-events-none' }
			: undefined}
		class={style.current === 'diamond'
			? 'inset-x-0 top-14 bottom-0 h-auto w-full max-w-none overflow-y-auto rounded-none bg-(--bg) px-5 py-6 shadow-none data-[state=closed]:animate-none data-[state=open]:animate-none'
			: 'w-80 overflow-y-auto'}
	>
		<SheetHeader class={style.current === 'diamond' ? 'sr-only' : undefined}
			><SheetTitle>Navigation</SheetTitle></SheetHeader
		>
		<nav class="mx-auto flex w-full max-w-6xl flex-col gap-6">
			<div class="flex flex-col gap-1">
				{#each mainNav as item (item.href)}
					<Button
						size="md"
						diamondClass="rounded-xl"
						variant="ghost"
						tone="neutral"
						href={item.href}
						class="w-full justify-start px-3 py-2 text-sm tracking-[-0.39px] transition-colors duration-150
							{isActive(item.href)
							? 'bg-(--text)/8 font-medium text-(--text)'
							: 'text-(--text)/56 hover:bg-(--text)/5 hover:text-(--text)'}"
					>
						{item.title}
					</Button>
				{/each}
			</div>
			{#each docsNav as section (section.title)}
				<div class="flex flex-col gap-1">
					<p class="px-3 pb-1 text-xs font-medium tracking-[-0.3px] text-(--text)/40">
						{section.title}
					</p>
					{#each section.items as item (item.href)}
						<Button
							size="md"
							diamondClass="rounded-xl"
							variant="ghost"
							tone="neutral"
							href={item.href}
							class="w-full justify-start px-3 py-2 text-sm tracking-[-0.39px] transition-colors duration-150
								{isActive(item.href)
								? 'bg-(--text)/8 font-medium text-(--text)'
								: 'text-(--text)/56 hover:bg-(--text)/5 hover:text-(--text)'}"
						>
							{item.title}
						</Button>
					{/each}
				</div>
			{/each}
		</nav>
	</SheetContent>
</Sheet>
