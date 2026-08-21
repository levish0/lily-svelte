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
		'inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-sm tracking-[-0.39px] whitespace-nowrap text-(--text)/56 transition-colors duration-150 outline-none hover:text-(--text) disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-(--bg-elevated) data-[state=active]:font-medium data-[state=active]:text-(--text) data-[state=active]:shadow-sm',
		className
	)}
	{...restProps}
/>
