<script lang="ts" module>
	export type ButtonGroupOrientation = 'horizontal' | 'vertical';
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		orientation = 'horizontal',
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		orientation?: ButtonGroupOrientation;
	} = $props();

	const orientationClasses: Record<ButtonGroupOrientation, string> = {
		horizontal: '[&>[data-slot]]:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none',
		vertical: 'flex-col [&>[data-slot]]:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none'
	};
</script>

<div
	bind:this={ref}
	role="group"
	data-slot="button-group"
	data-orientation={orientation}
	class={cn(
		'flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10',
		orientationClasses[orientation],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
