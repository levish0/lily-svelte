<script lang="ts">
	import { getDesignStyle } from '$lib/design-style';
	const style = getDesignStyle();
	import { fitBlockPreview } from '$lib/preview-height';
	import { cn } from '$lib/utils.js';
	import { BlockViewerContext } from './block-viewer.svelte';

	let { class: className }: { class?: string } = $props();
	const ctx = BlockViewerContext.get();
</script>

{#key ctx.iframeKey}
	<iframe
		use:fitBlockPreview
		title={ctx.item.name}
		src={style.current === 'diamond'
			? `/view/${ctx.item.name}`
			: `/preview/${style.current}/${ctx.item.name}?layout=full&height=${parseInt((ctx.item.meta?.iframeHeight as string) ?? '930')}`}
		height={parseInt((ctx.item.meta?.iframeHeight as string) ?? '930')}
		class={cn('relative z-20 block w-full bg-(--bg)', className)}
		loading="lazy"
	></iframe>
{/key}
