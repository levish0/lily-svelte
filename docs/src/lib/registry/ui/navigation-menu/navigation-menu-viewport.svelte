<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ViewportProps = $props();
</script>

<div class="absolute start-0 top-full isolate z-50 flex justify-center">
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			'origin-top relative mt-1.5 h-[calc(var(--bits-navigation-menu-viewport-height)+1rem)] w-full overflow-hidden rounded-2xl bg-(--bg-elevated) shadow-lg transition-[width,height] duration-200 md:w-[calc(var(--bits-navigation-menu-viewport-width)+1rem)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
			className
		)}
		{...restProps}
	/>
</div>
