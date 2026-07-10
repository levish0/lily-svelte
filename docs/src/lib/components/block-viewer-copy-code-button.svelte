<script lang="ts">
	import Icon from '@iconify/svelte';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import { BlockViewerContext } from './block-viewer.svelte';

	const ctx = BlockViewerContext.get();

	const clipboard = new UseClipboard();
</script>

{#if ctx.activeFileCodeToCopy}
	<button
		type="button"
		aria-label="Copy code"
		class="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
		onclick={() => {
			clipboard.copy(ctx.activeFileCodeToCopy);
		}}
	>
		{#if clipboard.copied}
			<Icon icon="heroicons:check-solid" class="size-3.5" aria-hidden="true" />
		{:else}
			<Icon icon="heroicons:clipboard-solid" class="size-3.5" aria-hidden="true" />
		{/if}
	</button>
{/if}
