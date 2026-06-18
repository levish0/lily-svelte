<script lang="ts">
	import Icon from '@iconify/svelte';
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
	<Icon
		icon="heroicons:magnifying-glass-solid"
		class="size-4.5 shrink-0 text-(--text)/40"
		aria-hidden="true"
	/>
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
