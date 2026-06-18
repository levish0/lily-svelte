<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.LinkProps = $props();
</script>

<NavigationMenuPrimitive.Link
	bind:ref
	data-slot="navigation-menu-link"
	class={cn(
		'flex flex-col gap-1 rounded-xl px-3 py-2 text-sm tracking-[-0.39px] outline-none transition-colors duration-150 hover:bg-(--text)/8 focus-visible:bg-(--text)/8 data-[active=true]:bg-(--text)/8 [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
/>
