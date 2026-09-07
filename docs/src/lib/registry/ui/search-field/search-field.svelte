<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		disabled,
		readonly,
		clearLabel = 'Clear search',
		onClear,
		...restProps
	}: Omit<HTMLInputAttributes, 'value' | 'type'> & {
		ref?: HTMLInputElement | null;
		value?: string;
		clearLabel?: string;
		onClear?: () => void;
	} = $props();
	function clear() {
		if (disabled || readonly) return;
		ref?.focus();
		value = '';
		if (ref) {
			ref.value = '';
			ref.dispatchEvent(new Event('input', { bubbles: true }));
		}
		onClear?.();
	}
</script>

<div
	data-slot="search-field"
	class={cn(
		'lily-search-field-root flex h-10 w-full items-center gap-2 rounded-3xl bg-(--text)/5 px-4 text-(--text)/56 focus-within:bg-(--text)/8',
		disabled && 'opacity-40',
		className
	)}
>
	<Icon
		icon="heroicons:magnifying-glass"
		class={cn('lily-search-field-icon size-4 shrink-0')}
		aria-hidden="true"
	/>
	<input
		bind:this={ref}
		bind:value
		type="search"
		{disabled}
		{readonly}
		class={cn(
			'lily-search-field-input w-full min-w-0 border-0 bg-transparent text-sm text-(--text) outline-none placeholder:text-(--text)/40 [&::-webkit-search-cancel-button]:appearance-none'
		)}
		{...restProps}
	/>
	{#if value && !disabled && !readonly}
		<button
			type="button"
			aria-label={clearLabel}
			onclick={clear}
			class={cn(
				'lily-search-field-clear flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-(--text)/40 outline-none focus-visible:ring-2 focus-visible:ring-(--text)/40'
			)}
		>
			<Icon icon="heroicons:x-circle-solid" class="size-full" aria-hidden="true" />
		</button>
	{/if}
</div>
