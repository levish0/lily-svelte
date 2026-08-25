<script lang="ts" module>
	import type { ZxcvbnResult } from '@zxcvbn-ts/core';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { PasswordScore } from './password.svelte.js';
	import type { WithElementRef } from '$lib/utils.js';

	export type PasswordProps = WithElementRef<
		Omit<HTMLInputAttributes, 'type' | 'files' | 'value'>,
		HTMLInputElement
	> & {
		value?: string;
		/** The full zxcvbn result, bindable out for form validation. */
		result?: ZxcvbnResult | null;
		/** Marks the input invalid until the score reaches this. */
		minScore?: PasswordScore;
		/** Show the strength meter under the input. */
		showStrength?: boolean;
		/** Replaces the built-in strength labels; five entries, weakest first. */
		strengthLabels?: string[];
	};
</script>

<script lang="ts">
	import Root from './password-root.svelte';
	import Input from './password-input.svelte';
	import ToggleVisibility from './password-toggle-visibility.svelte';
	import Strength from './password-strength.svelte';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		result = $bindable(null),
		minScore,
		showStrength = false,
		strengthLabels,
		class: className,
		...restProps
	}: PasswordProps = $props();
</script>

<!-- The composed happy path. Reach for the parts when this layout does not fit. -->
<Root bind:value bind:result {minScore}>
	<div class="relative">
		<Input bind:ref class={className} {...restProps} />
		<ToggleVisibility class="absolute end-1.5 top-1/2 -translate-y-1/2" />
	</div>
	{#if showStrength}
		<Strength labels={strengthLabels} />
	{/if}
</Root>
