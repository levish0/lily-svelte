<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { usePasswordRoot } from './password.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes, HTMLButtonElement> = $props();

	const root = usePasswordRoot();
</script>

<button
	bind:this={ref}
	type="button"
	data-slot="password-toggle-visibility"
	aria-label={root.visible ? 'Hide password' : 'Show password'}
	aria-pressed={root.visible}
	onclick={root.toggleVisibility}
	class={cn(
		'inline-flex size-8 items-center justify-center rounded-full text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)/72 focus-visible:outline-none',
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon
			icon={root.visible ? 'heroicons:eye-slash-solid' : 'heroicons:eye-solid'}
			class="size-4.5"
			aria-hidden="true"
		/>
	{/if}
</button>
