<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { PasswordScore } from './password.svelte.js';

	export type PasswordStrengthProps = {
		ref?: HTMLDivElement | null;
		class?: string;
		/** Replaces the built-in labels; must hold five entries, weakest first. */
		labels?: string[];
		/** Drop the label entirely and render the bar alone. */
		showLabel?: boolean;
		/** Render your own readout instead of the default label. */
		children?: Snippet<[{ score: PasswordScore | null; label: string | null }]>;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import {
		usePasswordRoot,
		PASSWORD_STRENGTH_LABELS,
		PASSWORD_STRENGTH_COLORS
	} from './password.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		labels = PASSWORD_STRENGTH_LABELS,
		showLabel = true,
		children
	}: PasswordStrengthProps = $props();

	const root = usePasswordRoot();

	// registering is what switches scoring on for this Root
	$effect(root.addScoreReader);

	const score = $derived(root.score);
	const label = $derived(score === null ? null : (labels[score] ?? null));
</script>

{#if score !== null}
	<div
		bind:this={ref}
		data-slot="password-strength"
		data-score={score}
		class={cn('flex items-center gap-3 px-1.5', className)}
	>
		<div class="h-1.5 flex-1 overflow-hidden rounded-full bg-(--text)/12">
			<div
				class={cn(
					'h-full rounded-full transition-all duration-300 ease-out',
					PASSWORD_STRENGTH_COLORS[score]
				)}
				style="width: {((score + 1) / 5) * 100}%"
			></div>
		</div>
		{#if children}
			{@render children({ score, label })}
		{:else if showLabel}
			<span class="w-16 shrink-0 text-right text-xs tracking-[-0.3px] text-(--text)/56">
				{label}
			</span>
		{/if}
	</div>
{/if}
