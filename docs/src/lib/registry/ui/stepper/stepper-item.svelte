<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { useStepperItem } from './stepper.svelte.js';
	import type { StepperItemProps } from './types';

	const uid = $props.id();

	let { id = uid, class: className, children, ...rest }: StepperItemProps = $props();

	const stepperItemState = useStepperItem({ id });
</script>

<div
	data-slot="stepper-item"
	class={cn(
		'group/stepper-item relative flex flex-1',
		'group-data-[orientation=horizontal]/stepper-nav:flex-col group-data-[orientation=horizontal]/stepper-nav:items-center',
		className
	)}
	{...stepperItemState.props}
	{...rest}
>
	{@render children?.()}
</div>
