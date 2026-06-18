<script lang="ts" module>
	export type Side = 'top' | 'right' | 'bottom' | 'left';
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from 'bits-ui';
	import type { Snippet, ComponentProps } from 'svelte';
	import SheetPortal from './sheet-portal.svelte';
	import SheetOverlay from './sheet-overlay.svelte';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		side = 'right',
		showCloseButton = true,
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SheetPortal>>;
		side?: Side;
		showCloseButton?: boolean;
		children: Snippet;
	} = $props();

	const sideClasses: Record<Side, string> = {
		right:
			'inset-y-0 right-0 h-full w-3/4 max-w-sm rounded-l-3xl data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
		left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm rounded-r-3xl data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
		top: 'inset-x-0 top-0 h-auto max-h-[80vh] rounded-b-3xl data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
		bottom: 'inset-x-0 bottom-0 h-auto max-h-[80vh] rounded-t-3xl data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom'
	};
</script>

<SheetPortal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitive.Content
		bind:ref
		data-slot="sheet-content"
		data-side={side}
		class={cn(
			'fixed z-50 flex flex-col gap-4 bg-(--bg-elevated) p-6 shadow-lg outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
			sideClasses[side],
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<SheetPrimitive.Close
				data-slot="sheet-close"
				class="absolute end-4 top-4 inline-flex size-8 items-center justify-center rounded-xl text-(--text)/48 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) focus-visible:outline-none"
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M6 6l12 12M18 6 6 18" />
				</svg>
				<span class="sr-only">Close</span>
			</SheetPrimitive.Close>
		{/if}
	</SheetPrimitive.Content>
</SheetPortal>
