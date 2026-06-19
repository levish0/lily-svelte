<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="stepper-description"
	class={cn(
		'text-xs leading-[1.4] tracking-[-0.3px] text-(--text)/40',
		'group-data-[orientation=horizontal]/stepper-nav:text-center group-data-[orientation=vertical]/stepper-nav:text-left',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
