<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	let {
		children,
		title,
		class: className
	}: {
		children?: Snippet;
		title?: string;
		class?: string;
	} = $props();
</script>

<div
	data-slot="callout"
	class={cn(
		'my-6 flex gap-3 rounded-2xl bg-(--text)/4 px-4 py-3.5 text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/72',
		className
	)}
>
	<Icon
		icon="heroicons:information-circle-solid"
		class="mt-0.5 size-4.5 shrink-0 text-(--text)/40"
		aria-hidden="true"
	/>
	<div class="flex flex-col gap-1">
		{#if title}
			<p class="font-medium text-(--text)">{title}</p>
		{/if}
		{@render children?.()}
	</div>
</div>
