<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		...restProps
	}: MenubarPrimitive.ItemProps & {
		variant?: 'default' | 'destructive';
	} = $props();
</script>

<MenubarPrimitive.Item
	bind:ref
	data-slot="menubar-item"
	data-variant={variant}
	class={cn(
		'relative flex cursor-default items-center gap-2 rounded-xl px-3 py-2 text-sm tracking-[-0.39px] transition-colors duration-150 outline-none select-none data-highlighted:bg-(--text)/8 data-[variant=destructive]:text-red-600 data-[variant=destructive]:data-highlighted:bg-red-500/10 dark:data-[variant=destructive]:text-red-400 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
/>
