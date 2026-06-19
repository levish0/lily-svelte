<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CollapsiblePrimitive.ContentProps = $props();
</script>

<CollapsiblePrimitive.Content
	bind:ref
	data-slot="collapsible-content"
	class={cn(
		'overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up',
		className
	)}
	{...restProps}
/>
