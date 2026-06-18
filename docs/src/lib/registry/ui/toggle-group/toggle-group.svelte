<script lang="ts" module>
	import { getContext, setContext } from 'svelte';
	import type { ToggleSize, ToggleVariant } from '$lib/registry/ui/toggle/index.js';

	interface ToggleGroupContext {
		variant: ToggleVariant;
		size: ToggleSize;
	}

	export function setToggleGroupCtx(props: ToggleGroupContext) {
		setContext('toggleGroup', props);
	}

	export function getToggleGroupCtx(): ToggleGroupContext {
		return getContext('toggleGroup');
	}
</script>

<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		size = 'default',
		orientation = 'horizontal',
		variant = 'default',
		...restProps
	}: ToggleGroupPrimitive.RootProps & {
		variant?: ToggleVariant;
		size?: ToggleSize;
		orientation?: 'horizontal' | 'vertical';
	} = $props();

	setToggleGroupCtx({
		get variant() {
			return variant;
		},
		get size() {
			return size;
		}
	} as ToggleGroupContext);
</script>

<ToggleGroupPrimitive.Root
	bind:value={value as never}
	bind:ref
	{orientation}
	data-slot="toggle-group"
	class={cn('flex w-fit items-center gap-1 data-[orientation=vertical]:flex-col', className)}
	{...restProps}
/>
