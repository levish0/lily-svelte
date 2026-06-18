<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.GroupHeadingProps = $props();
</script>

<MenubarPrimitive.GroupHeading
	bind:ref
	data-slot="menubar-label"
	class={cn('px-3 py-1.5 text-xs font-medium tracking-[-0.3px] text-(--text)/56', className)}
	{...restProps}
/>
