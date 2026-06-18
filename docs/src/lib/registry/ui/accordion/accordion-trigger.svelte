<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		level = 3,
		children,
		...restProps
	}: WithoutChild<AccordionPrimitive.TriggerProps> & {
		level?: AccordionPrimitive.HeaderProps['level'];
	} = $props();
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		bind:ref
		data-slot="accordion-trigger"
		class={cn(
			'group/accordion flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium tracking-[-0.39px] outline-none transition-colors duration-150 hover:text-(--text)/72 disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<!-- heroicons: chevron-down -->
		<svg
			class="size-4 shrink-0 text-(--text)/48 transition-transform duration-200 group-aria-expanded/accordion:rotate-180"
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
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
