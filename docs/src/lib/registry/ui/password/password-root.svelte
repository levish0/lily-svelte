<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { ZxcvbnResult } from '@zxcvbn-ts/core';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { PasswordScore } from './password.svelte.js';
	import type { WithElementRef } from '$lib/utils.js';

	export type PasswordRootProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		value?: string;
		/** The full zxcvbn result, bindable out for form validation. */
		result?: ZxcvbnResult | null;
		/** Marks the input invalid until the score reaches this. */
		minScore?: PasswordScore;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { untrack } from 'svelte';
	import { useId } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { setPasswordRoot } from './password.svelte.js';

	let {
		ref = $bindable(null),
		id = useId(),
		value = $bindable(''),
		result = $bindable(null),
		minScore,
		class: className,
		children,
		...restProps
	}: PasswordRootProps & { id?: string } = $props();

	const root = setPasswordRoot({
		get id() {
			return id;
		},
		get value() {
			return value;
		},
		set value(v) {
			value = v;
		},
		get minScore() {
			return minScore;
		}
	});

	// `untrack` keeps the effect from depending on the prop it writes, and the guard means an
	// unchanged score never fires a pointless update up the binding
	$effect(() => {
		const next = root.result;
		if (untrack(() => result) !== next) result = next;
	});
</script>

<div
	bind:this={ref}
	data-slot="password"
	class={cn('flex flex-col gap-2', className)}
	{...restProps}
>
	{@render children?.()}
</div>
