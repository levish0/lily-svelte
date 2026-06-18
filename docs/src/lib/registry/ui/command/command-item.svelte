<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CommandPrimitive.ItemProps = $props();
</script>

<CommandPrimitive.Item
	bind:ref
	data-slot="command-item"
	class={cn(
		'relative flex cursor-default items-center gap-2 rounded-xl px-3 py-2 text-sm tracking-[-0.39px] outline-none select-none data-selected:bg-(--text)/8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</CommandPrimitive.Item>
