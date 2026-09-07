<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		value = $bindable<number | null>(0),
		min,
		max,
		step = 1,
		size = 'md',
		disabled = false,
		class: className,
		...restProps
	}: Omit<HTMLInputAttributes, 'type' | 'value' | 'min' | 'max' | 'step' | 'size'> & {
		ref?: HTMLInputElement | null;
		value?: number | null;
		min?: number;
		max?: number;
		step?: number;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		disabled?: boolean;
	} = $props();

	function clamp(n: number) {
		if (min !== undefined) n = Math.max(min, n);
		if (max !== undefined) n = Math.min(max, n);
		return n;
	}

	const atMin = $derived(min !== undefined && value !== null && value <= min);
	const atMax = $derived(max !== undefined && value !== null && value >= max);

	function step_by(dir: 1 | -1) {
		value = clamp((value ?? 0) + dir * step);
	}
</script>

<div
	data-slot="number-field"
	class={cn(
		'lily-number-field-1 inline-flex w-fit items-center rounded-3xl bg-(--text)/5 transition-colors duration-150 focus-within:bg-(--text)/8 hover:bg-(--text)/8',
		disabled && 'lily-number-field-2 pointer-events-none opacity-50',
		{
			sm: ' lily-number-field-sm',
			md: ' lily-number-field-md',
			lg: ' lily-number-field-lg',
			xl: ' lily-number-field-xl'
		}[size],
		className
	)}
>
	<button
		type="button"
		aria-label="Decrement"
		disabled={disabled || atMin}
		onclick={() => step_by(-1)}
		class={cn(
			'lily-number-field-3 inline-flex size-10 shrink-0 items-center justify-center rounded-l-3xl text-(--text)/56 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) disabled:pointer-events-none disabled:opacity-40'
		)}
	>
		<Icon
			icon="heroicons:minus-solid"
			class={cn('lily-number-field-4 size-4')}
			aria-hidden="true"
		/>
	</button>
	<input
		bind:this={ref}
		type="number"
		bind:value
		{min}
		{max}
		{step}
		{disabled}
		onblur={() => {
			if (value !== null) value = clamp(value);
		}}
		class={cn(
			'lily-number-field-5 w-14 [appearance:textfield] bg-transparent text-center text-sm tracking-[-0.39px] outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
		)}
		{...restProps}
	/>
	<button
		type="button"
		aria-label="Increment"
		disabled={disabled || atMax}
		onclick={() => step_by(1)}
		class={cn(
			'lily-number-field-6 inline-flex size-10 shrink-0 items-center justify-center rounded-r-3xl text-(--text)/56 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) disabled:pointer-events-none disabled:opacity-40'
		)}
	>
		<Icon icon="heroicons:plus-solid" class={cn('lily-number-field-7 size-4')} aria-hidden="true" />
	</button>
</div>
