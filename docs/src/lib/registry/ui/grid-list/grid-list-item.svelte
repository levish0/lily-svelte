<script lang="ts">
	import { Button, type ButtonProps } from '$lib/registry/ui/button';
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';
	let {
		class: className,
		media,
		children,
		...restProps
	}: Omit<ButtonProps, 'media'> & { media?: Snippet } = $props();
</script>

<li class="min-w-0">
	<Button
		variant="ghost"
		data-slot="grid-list-item"
		class={cn(
			'lily-grid-list-item-base h-auto min-h-0 w-full min-w-0 flex-col gap-2 rounded-2xl bg-(--text)/5 px-3 py-3 text-sm font-medium whitespace-normal',
			className
		)}
		{...restProps}
	>
		{#if media}<span class={cn('lily-grid-list-media flex size-6 items-center justify-center')}
				>{@render media()}</span
			>{/if}
		<span>{@render children?.()}</span>
	</Button>
</li>
