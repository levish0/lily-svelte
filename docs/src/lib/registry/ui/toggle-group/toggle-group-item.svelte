<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
	import { getToggleGroupCtx } from './toggle-group.svelte';
	import { cn } from '$lib/utils.js';
	import { toggleVariants, type ToggleSize, type ToggleVariant } from '$lib/registry/ui/toggle/index.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		size,
		variant,
		...restProps
	}: ToggleGroupPrimitive.ItemProps & {
		variant?: ToggleVariant;
		size?: ToggleSize;
	} = $props();

	const ctx = getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
	bind:ref
	data-slot="toggle-group-item"
	class={cn(
		'shrink-0 focus-visible:z-10',
		toggleVariants({ variant: ctx?.variant ?? variant, size: ctx?.size ?? size }),
		className
	)}
	{value}
	{...restProps}
/>
