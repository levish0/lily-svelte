<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		class: className,
		href,
		children,
		...restProps
	}: HTMLAnchorAttributes = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={cn(
		'inline-flex w-fit shrink-0 items-center gap-1 rounded-full bg-(--text)/8 px-3 py-1 text-xs leading-normal tracking-[-0.3px] text-(--text)/60',
		href && 'transition-colors duration-150 hover:bg-(--text)/12 hover:text-(--text)/80',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
