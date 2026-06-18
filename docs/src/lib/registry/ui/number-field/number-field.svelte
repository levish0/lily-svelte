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
		disabled = false,
		class: className,
		...restProps
	}: Omit<HTMLInputAttributes, 'type' | 'value' | 'min' | 'max' | 'step'> & {
		ref?: HTMLInputElement | null;
		value?: number | null;
		min?: number;
		max?: number;
		step?: number;
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
		'inline-flex items-center rounded-3xl bg-(--text)/5 transition-colors duration-150 hover:bg-(--text)/[0.07] focus-within:bg-(--text)/8',
		disabled && 'pointer-events-none opacity-50',
		className
	)}
>
	<button
		type="button"
		aria-label="Decrement"
		disabled={disabled || atMin}
		onclick={() => step_by(-1)}
		class="inline-flex size-10 shrink-0 items-center justify-center rounded-l-3xl text-(--text)/56 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) disabled:pointer-events-none disabled:opacity-40"
	>
		<Icon icon="heroicons:minus-solid" class="size-4" aria-hidden="true" />
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
		class="w-14 [appearance:textfield] bg-transparent text-center text-sm tracking-[-0.39px] outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		{...restProps}
	/>
	<button
		type="button"
		aria-label="Increment"
		disabled={disabled || atMax}
		onclick={() => step_by(1)}
		class="inline-flex size-10 shrink-0 items-center justify-center rounded-r-3xl text-(--text)/56 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) disabled:pointer-events-none disabled:opacity-40"
	>
		<Icon icon="heroicons:plus-solid" class="size-4" aria-hidden="true" />
	</button>
</div>
