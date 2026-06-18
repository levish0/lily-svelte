<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		sideOffset = 6,
		align = 'start',
		class: className,
		...restProps
	}: DropdownMenuPrimitive.ContentProps = $props();
</script>

<DropdownMenuPrimitive.Portal>
	<DropdownMenuPrimitive.Content
		bind:ref
		data-slot="dropdown-menu-content"
		{sideOffset}
		{align}
		class={cn(
			'z-50 min-w-44 origin-(--bits-dropdown-menu-content-transform-origin) overflow-y-auto rounded-2xl bg-(--bg-elevated) p-1.5 shadow-xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
			className
		)}
		{...restProps}
	/>
</DropdownMenuPrimitive.Portal>
