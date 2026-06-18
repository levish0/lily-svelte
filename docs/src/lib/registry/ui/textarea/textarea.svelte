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
		'flex field-sizing-content min-h-20 w-full resize-y rounded-2xl border border-(--text)/12 bg-(--bg-elevated) px-3.5 py-2.5 text-sm leading-[1.5] tracking-[-0.39px] outline-none transition-colors duration-150 placeholder:text-(--text)/36 focus-visible:border-(--text)/32 disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	bind:value
	{...restProps}
></textarea>
