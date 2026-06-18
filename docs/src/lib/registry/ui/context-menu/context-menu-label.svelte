<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ContextMenuPrimitive.GroupHeadingProps = $props();
</script>

<ContextMenuPrimitive.GroupHeading
	bind:ref
	data-slot="context-menu-label"
	class={cn('px-3 py-1.5 text-xs font-medium tracking-[-0.3px] text-(--text)/56', className)}
	{...restProps}
/>
