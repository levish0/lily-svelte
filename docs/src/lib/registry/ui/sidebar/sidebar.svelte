<script lang="ts">
	import * as Sheet from '$lib/registry/ui/sheet/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { SIDEBAR_WIDTH_MOBILE } from './constants.js';
	import { useSidebar } from './context.svelte.js';

	let {
		ref = $bindable(null),
		side = 'left',
		variant = 'sidebar',
		collapsible = 'offcanvas',
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		side?: 'left' | 'right';
		variant?: 'sidebar' | 'floating' | 'inset';
		collapsible?: 'offcanvas' | 'icon' | 'none';
	} = $props();

	const sidebar = useSidebar();
</script>

{#if collapsible === 'none'}
	<div
		bind:this={ref}
		class={cn(
			'lily-sidebar-1 flex h-full w-(--sidebar-width) flex-col bg-(--bg) text-(--text)',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</div>
{:else if sidebar.isMobile}
	<Sheet.Root bind:open={() => sidebar.openMobile, (v) => sidebar.setOpenMobile(v)} {...restProps}>
		<Sheet.Content
			bind:ref
			data-sidebar="sidebar"
			data-slot="sidebar"
			data-mobile="true"
			showCloseButton={false}
			class={cn('lily-sidebar-2 w-(--sidebar-width) gap-0 bg-(--bg) p-0 text-(--text)', className)}
			style="--sidebar-width: {SIDEBAR_WIDTH_MOBILE};"
			{side}
		>
			<Sheet.Header class={cn('lily-sidebar-3 sr-only')}>
				<Sheet.Title>Sidebar</Sheet.Title>
				<Sheet.Description>Displays the mobile sidebar.</Sheet.Description>
			</Sheet.Header>
			<div class={cn('lily-sidebar-4 flex h-full w-full flex-col')}>
				{@render children?.()}
			</div>
		</Sheet.Content>
	</Sheet.Root>
{:else}
	<div
		bind:this={ref}
		class={cn('group peer lily-sidebar-10 hidden text-(--text) md:block')}
		data-state={sidebar.state}
		data-collapsible={sidebar.state === 'collapsed' ? collapsible : ''}
		data-variant={variant}
		data-side={side}
		data-slot="sidebar"
	>
		<!-- This is what handles the sidebar gap on desktop -->
		<div
			data-slot="sidebar-gap"
			class={cn(
				'lily-sidebar-5 relative w-(--sidebar-width) bg-transparent transition-[width] duration-200',
				'group-data-[collapsible=offcanvas]:w-0',
				'group-data-[side=right]:rotate-180',
				variant === 'floating' || variant === 'inset'
					? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
					: 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
			)}
		></div>
		<div
			data-slot="sidebar-container"
			class={cn(
				'lily-sidebar-6 fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 md:flex',
				side === 'left'
					? 'start-0 group-data-[collapsible=offcanvas]:start-[calc(var(--sidebar-width)*-1)]'
					: 'end-0 group-data-[collapsible=offcanvas]:end-[calc(var(--sidebar-width)*-1)]',
				// Adjust the padding for floating and inset variants.
				variant === 'floating' || variant === 'inset'
					? 'lily-sidebar-7 p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
					: 'lily-sidebar-8 border-(--text)/8 group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-e group-data-[side=right]:border-s',
				className
			)}
			{...restProps}
		>
			<div
				data-sidebar="sidebar"
				data-slot="sidebar-inner"
				class={cn(
					'lily-sidebar-9 flex size-full flex-col bg-(--bg) group-data-[variant=floating]:rounded-3xl group-data-[variant=floating]:border group-data-[variant=floating]:border-(--text)/8 group-data-[variant=floating]:bg-(--bg-elevated) group-data-[variant=floating]:shadow-sm'
				)}
			>
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}
