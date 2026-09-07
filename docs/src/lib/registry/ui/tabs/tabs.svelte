<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { setTabsPresentation, type TabsPresentation } from './context.js';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		variant = 'default',
		size = 'sm',
		...restProps
	}: TabsPrimitive.RootProps & Partial<TabsPresentation> = $props();
	setTabsPresentation({
		get variant() {
			return variant;
		},
		get size() {
			return size;
		}
	});
</script>

<TabsPrimitive.Root
	bind:ref
	bind:value
	data-slot="tabs"
	class={cn('lily-tabs-1 flex flex-col gap-3', className)}
	{...restProps}
/>
