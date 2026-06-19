<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, class: className, ...props }: HTMLAttributes<HTMLElement> = $props();
</script>

<h3
	class={cn(
		'relative mt-8 scroll-m-32 text-base font-medium tracking-[-0.48px] [counter-increment:step]',
		'before:absolute before:-start-[2.78rem] before:flex before:size-6 before:items-center before:justify-center before:rounded-full before:bg-[color-mix(in_srgb,var(--text)_8%,var(--bg))] before:text-xs before:font-medium before:text-(--text)/72 before:tabular-nums before:content-[counter(step)]',
		className
	)}
	{...props}
>
	{@render children?.()}
</h3>
