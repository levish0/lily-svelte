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
		horizontal: '[&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:rounded-l-none',
		vertical: 'flex-col [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:rounded-t-none'
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
