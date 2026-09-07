<script lang="ts">
	import { RadioGroup as Primitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { getSegmentSize } from './context.js';
	const presentation = getSegmentSize();
	let { ref = $bindable(null), class: className, ...restProps }: Primitive.ItemProps = $props();
</script>

<Primitive.Item
	bind:ref
	data-slot="choice-group-item"
	class={cn(
		'lily-choice-group-item-base inline-flex flex-1 items-center justify-center rounded-full px-4 py-1.5 text-sm whitespace-nowrap text-(--text)/56 outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-(--bg-elevated) data-[state=checked]:font-medium data-[state=checked]:text-(--text) data-[state=checked]:shadow-sm',
		presentation.size === 'lg' && 'lily-choice-group-item-large px-5 py-2 text-base',
		className
	)}
	{...restProps}
/>
