<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 6,
		portalProps,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: SelectPrimitive.PortalProps;
	} = $props();
</script>

<SelectPrimitive.Portal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		data-slot="select-content"
		class={cn(
			'relative z-50 max-h-72 min-w-(--bits-select-anchor-width) overflow-y-auto overscroll-contain rounded-2xl bg-(--bg-elevated) p-1.5 shadow-lg outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
			className
		)}
		{...restProps}
	>
		<SelectPrimitive.Viewport>
			{@render children?.()}
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
