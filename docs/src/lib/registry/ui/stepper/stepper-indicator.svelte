<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="stepper-indicator"
	class={cn(
		'relative z-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-(--text) text-xs font-medium text-(--bg) outline-none transition-colors duration-150 select-none [&_svg]:size-4',
		'group-data-[state=inactive]/stepper-trigger:bg-(--text)/8 group-data-[state=inactive]/stepper-trigger:text-(--text)/56',
		'group-focus-visible/stepper-trigger:ring-2 group-focus-visible/stepper-trigger:ring-(--text)/24',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
