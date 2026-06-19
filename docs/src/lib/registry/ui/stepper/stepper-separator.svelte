<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useStepperSeparator } from './stepper.svelte.js';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();

	const separatorState = useStepperSeparator();
</script>

<div
	data-slot="stepper-separator"
	class={cn(
		'absolute shrink-0 rounded-full bg-(--text)/12 transition-colors duration-150 data-[state=completed]:bg-(--text)',
		'group-data-[orientation=horizontal]/stepper-nav:top-[13px] group-data-[orientation=horizontal]/stepper-nav:left-[calc(50%+1.125rem)] group-data-[orientation=horizontal]/stepper-nav:h-0.5 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2.25rem)]',
		'group-data-[orientation=vertical]/stepper-nav:top-[calc(1.75rem+0.5rem)] group-data-[orientation=vertical]/stepper-nav:left-[13px] group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2.25rem)] group-data-[orientation=vertical]/stepper-nav:w-0.5',
		separatorState.itemState.isLast && 'hidden',
		className
	)}
	{...separatorState.props}
	{...rest}
>
	{@render children?.()}
</div>
