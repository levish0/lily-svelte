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
	// Monochrome ramp "filling toward solid"; red (the one allowed accent) for weak.
	const STRENGTH_COLORS = [
		'bg-red-500/70',
		'bg-red-500/70',
		'bg-(--text)/40',
		'bg-(--text)/65',
		'bg-(--text)'
	];
</script>

<script lang="ts">
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
			<!-- heroicons: eye-slash -->
			<svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
			</svg>
		{:else}
			<!-- heroicons: eye -->
			<svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
				<path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
			</svg>
		{/if}
	</button>
</div>

{#if showStrength && score !== null}
	<div class="flex flex-col gap-1.5">
		<div class="flex gap-1.5">
			{#each Array.from({ length: 5 }) as _, i (i)}
				<div
					class={cn(
						'h-1 flex-1 rounded-full transition-colors duration-200',
						i <= score ? STRENGTH_COLORS[score] : 'bg-(--text)/10'
					)}
				></div>
			{/each}
		</div>
		<span class="text-xs tracking-[-0.3px] text-(--text)/56">{STRENGTH_LABELS[score]}</span>
	</div>
{/if}
</div>
