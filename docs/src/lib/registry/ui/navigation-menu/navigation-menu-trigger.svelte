<script lang="ts" module>
	import { cn } from '$lib/utils.js';

	export function navigationMenuTriggerStyle(): string {
		return 'inline-flex h-9 w-max items-center justify-center gap-1 rounded-2xl px-3 text-sm font-medium tracking-[-0.39px] text-(--text)/72 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) focus-visible:bg-(--text)/8 data-[state=open]:bg-(--text)/8 data-[state=open]:text-(--text) disabled:pointer-events-none disabled:opacity-50';
	}
</script>

<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: NavigationMenuPrimitive.TriggerProps = $props();
</script>

<NavigationMenuPrimitive.Trigger
	bind:ref
	data-slot="navigation-menu-trigger"
	class={cn(navigationMenuTriggerStyle(), 'group', className)}
	{...restProps}
>
	{@render children?.()}
	<!-- heroicons: chevron-down -->
	<svg
		class="size-3.5 text-(--text)/40 transition-transform duration-200 group-data-[state=open]:rotate-180"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="m6 9 6 6 6-6" />
	</svg>
</NavigationMenuPrimitive.Trigger>
