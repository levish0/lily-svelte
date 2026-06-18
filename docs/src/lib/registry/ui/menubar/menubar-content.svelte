<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 8,
		alignOffset = -4,
		align = 'start',
		side = 'bottom',
		portalProps,
		...restProps
	}: MenubarPrimitive.ContentProps & {
		portalProps?: MenubarPrimitive.PortalProps;
	} = $props();
</script>

<MenubarPrimitive.Portal {...portalProps}>
	<MenubarPrimitive.Content
		bind:ref
		data-slot="menubar-content"
		{align}
		{alignOffset}
		{side}
		{sideOffset}
		class={cn(
			'z-50 min-w-44 origin-(--bits-menubar-content-transform-origin) overflow-y-auto rounded-2xl bg-(--bg-elevated) p-1.5 shadow-lg ring-1 ring-(--text)/6 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
			className
		)}
		{...restProps}
	/>
</MenubarPrimitive.Portal>
