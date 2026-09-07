<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { getTabsPresentation } from './context.js';
	const presentation = getTabsPresentation();

	let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="tabs-list"
	class={cn(
		presentation.variant === 'segmented'
			? 'lily-tabs-list-segmented inline-flex w-fit items-center gap-1 rounded-3xl bg-(--text)/5 p-1'
			: 'lily-tabs-list-1 inline-flex w-fit items-center gap-1 rounded-3xl bg-(--text)/5 p-1',
		presentation.variant === 'segmented' &&
			presentation.size === 'lg' &&
			'lily-tabs-list-segmented-large p-1',
		className
	)}
	{...restProps}
/>
