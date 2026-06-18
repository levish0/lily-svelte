<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.TriggerProps = $props();
</script>

<TabsPrimitive.Trigger
	bind:ref
	data-slot="tabs-trigger"
	class={cn(
		'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm tracking-[-0.39px] text-(--text)/48 outline-none transition-colors duration-150 hover:text-(--text) data-[state=active]:bg-(--bg-elevated) data-[state=active]:font-medium data-[state=active]:text-(--text) data-[state=active]:shadow-sm disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	{...restProps}
/>
