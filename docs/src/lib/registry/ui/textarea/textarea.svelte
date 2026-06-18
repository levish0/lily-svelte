<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
	bind:this={ref}
	data-slot="textarea"
	class={cn(
		'flex field-sizing-content min-h-20 w-full resize-none rounded-3xl bg-(--text)/5 px-4 py-2.5 text-sm leading-[1.5] tracking-[-0.39px] outline-none transition-colors duration-150 placeholder:text-(--text)/36 hover:bg-(--text)/8 focus-visible:bg-(--text)/10 disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	bind:value
	{...restProps}
></textarea>
