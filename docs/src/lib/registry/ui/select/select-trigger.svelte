<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	class={cn(
		'flex h-10 w-fit min-w-44 items-center justify-between gap-2 rounded-3xl bg-(--text)/5 px-4 py-2 text-sm tracking-[-0.39px] outline-none transition-colors duration-150 hover:bg-(--text)/8 focus-visible:bg-(--text)/8 focus-visible:ring-2 focus-visible:ring-(--text)/15 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<!-- heroicons: chevron-down -->
	<svg
		class="size-4 shrink-0 text-(--text)/40"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="m6 9 6 6 6-6" />
	</svg>
</SelectPrimitive.Trigger>
