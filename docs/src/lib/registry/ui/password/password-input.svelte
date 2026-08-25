<script lang="ts">
	import { Input } from '$lib/registry/ui/input/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { usePasswordRoot } from './password.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<
		Omit<HTMLInputAttributes, 'type' | 'files' | 'value'>,
		HTMLInputElement
	> = $props();

	const root = usePasswordRoot();
</script>

<!-- `pe-11` leaves room for ToggleVisibility, which is positioned over the input -->
<Input
	bind:ref
	bind:value={root.value}
	id={root.id}
	type={root.visible ? 'text' : 'password'}
	data-slot="password-input"
	aria-invalid={root.meetsMinScore ? undefined : true}
	class={cn('pe-11', className)}
	{...restProps}
/>
