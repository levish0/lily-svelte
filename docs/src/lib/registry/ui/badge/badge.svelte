<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		href,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(
		'inline-flex w-fit shrink-0 items-center gap-1 rounded-full bg-(--text)/8 px-3 py-1 text-xs leading-normal tracking-[-0.3px] text-(--text)/56',
		href && 'transition-colors duration-150 hover:bg-(--text)/12 hover:text-(--text)/72',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
