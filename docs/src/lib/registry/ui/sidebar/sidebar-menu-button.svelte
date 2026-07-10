<script lang="ts" module>
	import { cn } from '$lib/utils.js';

	export type SidebarMenuButtonVariant = 'default' | 'outline';
	export type SidebarMenuButtonSize = 'default' | 'sm' | 'lg';

	const variants: Record<SidebarMenuButtonVariant, string> = {
		default: '',
		outline: 'border border-(--text)/8 bg-(--bg-elevated)'
	};

	const sizes: Record<SidebarMenuButtonSize, string> = {
		default: 'h-9 text-sm',
		sm: 'h-8 text-xs',
		lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!'
	};

	export function sidebarMenuButtonVariants({
		variant = 'default',
		size = 'default'
	}: {
		variant?: SidebarMenuButtonVariant;
		size?: SidebarMenuButtonSize;
	} = {}): string {
		return cn(
			'peer/menu-button group/menu-button flex w-full items-center gap-2.5 overflow-hidden rounded-xl px-3 text-left tracking-[-0.39px] text-(--text)/56 outline-none transition-[width,height,padding,color,background-color] duration-200 select-none hover:bg-(--text)/5 hover:text-(--text) focus-visible:bg-(--text)/5 focus-visible:text-(--text) disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-(--text)/8 data-active:font-medium data-active:text-(--text) data-[state=open]:hover:bg-(--text)/5 group-has-data-[sidebar=menu-action]/menu-item:pe-8 group-data-[collapsible=icon]:size-9! group-data-[collapsible=icon]:p-2.5! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
			variants[variant],
			sizes[size]
		);
	}
</script>

<script lang="ts">
	import * as Tooltip from '$lib/registry/ui/tooltip/index.js';
	import { type WithElementRef, type WithoutChildrenOrChild } from '$lib/utils.js';
	import { mergeProps } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useSidebar } from './context.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		child,
		variant = 'default',
		size = 'default',
		isActive = false,
		tooltipContent,
		tooltipContentProps,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
		isActive?: boolean;
		variant?: SidebarMenuButtonVariant;
		size?: SidebarMenuButtonSize;
		tooltipContent?: Snippet | string;
		tooltipContentProps?: WithoutChildrenOrChild<ComponentProps<typeof Tooltip.Content>>;
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const sidebar = useSidebar();

	const buttonProps = $derived({
		class: cn(sidebarMenuButtonVariants({ variant, size }), className),
		'data-slot': 'sidebar-menu-button',
		'data-sidebar': 'menu-button',
		'data-size': size,
		'data-active': isActive,
		...restProps
	});
</script>

{#snippet Button({ props }: { props?: Record<string, unknown> })}
	{@const mergedProps = mergeProps(buttonProps, props)}
	{#if child}
		{@render child({ props: mergedProps })}
	{:else}
		<button bind:this={ref} {...mergedProps}>
			{@render children?.()}
		</button>
	{/if}
{/snippet}

{#if !tooltipContent}
	{@render Button({})}
{:else}
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				{@render Button({ props })}
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content
			side="right"
			align="center"
			hidden={sidebar.state !== 'collapsed' || sidebar.isMobile}
			{...tooltipContentProps}
		>
			{#if typeof tooltipContent === 'string'}
				{tooltipContent}
			{:else if tooltipContent}
				{@render tooltipContent()}
			{/if}
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
