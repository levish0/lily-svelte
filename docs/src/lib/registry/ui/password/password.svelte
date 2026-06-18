<script lang="ts" module>
	import { zxcvbnOptions } from '@zxcvbn-ts/core';
	import * as zxcvbnCommon from '@zxcvbn-ts/language-common';

	let configured = false;
	function ensureConfigured() {
		if (configured) return;
		zxcvbnOptions.setOptions({
			dictionary: { ...zxcvbnCommon.dictionary },
			graphs: zxcvbnCommon.adjacencyGraphs
		});
		configured = true;
	}

	const STRENGTH_LABELS = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
	// Weak → strong: red → amber → lime → green.
	const STRENGTH_COLORS = [
		'bg-red-500',
		'bg-red-500',
		'bg-amber-500',
		'bg-lime-500',
		'bg-green-500'
	];
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import { Input } from '$lib/registry/ui/input';
	import { zxcvbn } from '@zxcvbn-ts/core';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		showStrength = false,
		class: className,
		...restProps
	}: WithElementRef<Omit<HTMLInputAttributes, 'type' | 'files'>, HTMLInputElement> & {
		showStrength?: boolean;
	} = $props();

	let visible = $state(false);

	const score = $derived.by(() => {
		if (!showStrength || !value) return null;
		ensureConfigured();
		return zxcvbn(String(value)).score; // 0–4
	});
</script>

<div class="flex flex-col gap-2">
<div class="relative">
	<Input
		bind:ref
		bind:value
		type={visible ? 'text' : 'password'}
		class={cn('pe-11', className)}
		{...restProps}
	/>
	<button
		type="button"
		tabindex={-1}
		aria-label={visible ? 'Hide password' : 'Show password'}
		onclick={() => (visible = !visible)}
		class="absolute end-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)/72 focus-visible:outline-none"
	>
		{#if visible}
			<Icon icon="heroicons:eye-slash-solid" class="size-4.5" aria-hidden="true" />
		{:else}
			<Icon icon="heroicons:eye-solid" class="size-4.5" aria-hidden="true" />
		{/if}
	</button>
</div>

{#if showStrength && score !== null}
	<div class="flex items-center gap-3 px-1.5">
		<div class="h-1.5 flex-1 overflow-hidden rounded-full bg-(--text)/10">
			<div
				class={cn('h-full rounded-full transition-all duration-300 ease-out', STRENGTH_COLORS[score])}
				style="width: {((score + 1) / 5) * 100}%"
			></div>
		</div>
		<span class="w-16 shrink-0 text-right text-xs tracking-[-0.3px] text-(--text)/56">
			{STRENGTH_LABELS[score]}
		</span>
	</div>
{/if}
</div>
