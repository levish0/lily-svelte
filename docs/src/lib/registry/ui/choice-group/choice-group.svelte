<script lang="ts">
	import { RadioGroup as Primitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { setSegmentSize } from './context.js';
	let {
		ref = $bindable(null),
		value = $bindable(''),
		size = 'sm',
		class: className,
		...restProps
	}: Primitive.RootProps & { size?: 'sm' | 'lg' } = $props();
	setSegmentSize({
		get size() {
			return size;
		}
	});
</script>

<Primitive.Root
	bind:ref
	bind:value
	data-slot="choice-group"
	class={cn(
		'lily-choice-group-base inline-flex w-fit max-w-full items-stretch gap-1 rounded-3xl bg-(--text)/5 p-1',
		size === 'lg' && 'lily-choice-group-large p-1',
		className
	)}
	{...restProps}
/>
