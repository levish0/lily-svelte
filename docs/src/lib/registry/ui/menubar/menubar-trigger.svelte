<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.TriggerProps = $props();
</script>

<MenubarPrimitive.Trigger
	bind:ref
	data-slot="menubar-trigger"
	class={cn(
		'lily-menubar-trigger-1 flex items-center rounded-xl px-3 py-1.5 text-sm font-medium tracking-[-0.39px] transition-colors duration-150 outline-none select-none hover:bg-(--text)/8 data-[state=open]:bg-(--text)/12',
		className
	)}
	{...restProps}
/>
