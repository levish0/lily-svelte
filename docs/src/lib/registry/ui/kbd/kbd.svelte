<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<kbd
	bind:this={ref}
	data-slot="kbd"
	class={cn(
		'inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-md bg-(--text)/8 px-1.5 font-sans text-[0.7rem] font-medium tracking-[-0.3px] text-(--text)/56 select-none',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</kbd>
