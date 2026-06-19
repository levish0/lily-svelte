<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="stepper-title"
	class={cn(
		'text-sm font-medium tracking-[-0.39px]',
		'group-data-[orientation=horizontal]/stepper-nav:text-center group-data-[orientation=vertical]/stepper-nav:text-left',
		'group-data-[state=inactive]/stepper-trigger:text-(--text)/56',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
