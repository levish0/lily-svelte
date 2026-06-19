<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		...restProps
	}: DropdownMenuPrimitive.ItemProps & {
		variant?: 'default' | 'destructive';
	} = $props();
</script>

<DropdownMenuPrimitive.Item
	bind:ref
	data-slot="dropdown-menu-item"
	data-variant={variant}
	class={cn(
		'relative flex cursor-default items-center gap-2 rounded-xl px-3 py-2 text-sm tracking-[-0.39px] outline-none select-none transition-colors duration-150 data-highlighted:bg-(--text)/8 data-disabled:pointer-events-none data-disabled:opacity-50 data-[variant=destructive]:text-red-600 data-[variant=destructive]:data-highlighted:bg-red-500/10 dark:data-[variant=destructive]:text-red-400 [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
/>
