<script lang="ts">
	import { LinkPreview as HoverCardPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		align = 'center',
		sideOffset = 8,
		portalProps,
		...restProps
	}: HoverCardPrimitive.ContentProps & {
		portalProps?: HoverCardPrimitive.PortalProps;
	} = $props();
</script>

<HoverCardPrimitive.Portal {...portalProps}>
	<HoverCardPrimitive.Content
		bind:ref
		data-slot="hover-card-content"
		{align}
		{sideOffset}
		class={cn(
			'z-50 w-64 origin-(--bits-link-preview-content-transform-origin) rounded-3xl bg-(--bg-elevated) p-4 text-sm tracking-[-0.39px] shadow-lg ring-1 ring-(--text)/6 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
			className
		)}
		{...restProps}
	/>
</HoverCardPrimitive.Portal>
