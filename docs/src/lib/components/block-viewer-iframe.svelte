<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { BlockViewerContext } from './block-viewer.svelte';

	let { class: className }: { class?: string } = $props();
	const ctx = BlockViewerContext.get();
</script>

{#key ctx.iframeKey}
	<iframe
		title={ctx.item.name}
		src="/view/{ctx.item.name}"
		height={parseInt((ctx.item.meta?.iframeHeight as string) ?? '930')}
		class={cn('relative z-20 w-full bg-(--bg)', className)}
		loading="lazy"
	></iframe>
{/key}
