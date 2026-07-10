<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { useSidebar } from './context.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		onclick,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> = $props();

	const sidebar = useSidebar();
</script>

<button
	bind:this={ref}
	data-sidebar="trigger"
	data-slot="sidebar-trigger"
	type="button"
	class={cn(
		'inline-flex size-8 shrink-0 items-center justify-center rounded-xl text-(--text)/40 outline-none transition-colors duration-150 hover:bg-(--text)/5 hover:text-(--text)',
		className
	)}
	onclick={(e) => {
		onclick?.(e);
		sidebar.toggle();
	}}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon="heroicons:bars-3-bottom-left-solid" class="size-4.5" aria-hidden="true" />
	{/if}
	<span class="sr-only">Toggle Sidebar</span>
</button>
