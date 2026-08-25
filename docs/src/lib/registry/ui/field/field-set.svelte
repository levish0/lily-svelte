<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLFieldsetAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLFieldsetAttributes, HTMLFieldSetElement> = $props();
</script>

<fieldset
	bind:this={ref}
	data-slot="field-set"
	class={cn('flex min-w-0 flex-col gap-5', className)}
	{...restProps}
>
	{@render children?.()}
</fieldset>
