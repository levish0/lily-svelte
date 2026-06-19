<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<AlertDialogPrimitive.ContentProps> & {
		portalProps?: AlertDialogPrimitive.PortalProps;
		children: import('svelte').Snippet;
	} = $props();
</script>

<AlertDialogPrimitive.Portal {...portalProps}>
	<AlertDialogPrimitive.Overlay
		data-slot="alert-dialog-overlay"
		class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
	/>
	<AlertDialogPrimitive.Content
		bind:ref
		data-slot="alert-dialog-content"
		class={cn(
			'fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-3xl bg-(--bg-elevated) p-6 shadow-lg outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
