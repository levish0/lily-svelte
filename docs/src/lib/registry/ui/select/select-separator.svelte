<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Separator } from '$lib/registry/ui/separator/index.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<!-- bleeds past the menu's p-1.5 so the rule spans the full popover -->
<Separator
	bind:ref
	data-slot="select-separator"
	class={cn('-mx-1.5 my-1.5 w-auto', className)}
	{...restProps}
/>
