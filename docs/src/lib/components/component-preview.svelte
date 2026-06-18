<script lang="ts">
	import type { Component } from 'svelte';
	import { cn } from '$lib/utils.js';

	let {
		name,
		component,
		align = 'center',
		class: className
	}: {
		name: string;
		component?: Component;
		align?: 'center' | 'start' | 'end';
		class?: string;
	} = $props();

	const Comp = $derived(component);
</script>

<div
	class={cn(
		'flex min-h-80 w-full justify-center rounded-3xl border border-(--text)/8 bg-(--bg) p-10',
		align === 'center' && 'items-center',
		align === 'start' && 'items-start',
		align === 'end' && 'items-end',
		className
	)}
	data-preview={name}
>
	{#if Comp}
		<Comp />
	{/if}
</div>
