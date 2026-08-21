<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import DialogOverlay from './dialog-overlay.svelte';
	import DialogPortal from './dialog-portal.svelte';
	import type { Snippet, ComponentProps } from 'svelte';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = true,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
		children: Snippet;
		showCloseButton?: boolean;
	} = $props();
</script>

<DialogPortal {...portalProps}>
	<DialogOverlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(
			'fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-3xl bg-(--bg-elevated) p-6 shadow-lg outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close
				data-slot="dialog-close"
				class="absolute end-4 top-4 inline-flex size-8 items-center justify-center rounded-xl text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) focus-visible:outline-none"
			>
				<Icon icon="heroicons:x-mark-solid" class="size-4" aria-hidden="true" />
				<span class="sr-only">Close</span>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPortal>
