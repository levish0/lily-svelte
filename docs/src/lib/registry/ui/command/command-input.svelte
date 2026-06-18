<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(''),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<div
	data-slot="command-input-wrapper"
	class="flex items-center gap-2 border-b border-(--text)/8 px-4"
>
	<!-- heroicons: magnifying-glass -->
	<svg class="size-4.5 shrink-0 text-(--text)/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<circle cx="11" cy="11" r="7" />
		<path d="m21 21-4.3-4.3" />
	</svg>
	<CommandPrimitive.Input {value} data-slot="command-input" {...restProps}>
		{#snippet child({ props })}
			<input
				{...props}
				bind:value
				bind:this={ref}
				class={cn(
					'h-12 flex-1 bg-transparent text-sm tracking-[-0.39px] outline-none placeholder:text-(--text)/40 disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
			/>
		{/snippet}
	</CommandPrimitive.Input>
</div>
