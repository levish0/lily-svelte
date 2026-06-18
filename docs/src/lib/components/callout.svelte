<script lang="ts">
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
	<!-- heroicons: information-circle -->
	<svg
		class="mt-0.5 size-4.5 shrink-0 text-(--text)/40"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.7"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 16v-4M12 8h.01" />
	</svg>
	<div class="flex flex-col gap-1">
		{#if title}
			<p class="font-medium text-(--text)">{title}</p>
		{/if}
		{@render children?.()}
	</div>
</div>
