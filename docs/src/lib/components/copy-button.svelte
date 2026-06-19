<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Tooltip from '$lib/registry/ui/tooltip/index.js';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import { cn } from '$lib/utils.js';

	let { text, class: className }: { text: string; class?: string } = $props();

	const clipboard = new UseClipboard();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger
			aria-label="Copy code"
			onclick={() => clipboard.copy(text)}
			class={cn(
				'absolute end-3 top-3 z-10 inline-flex size-7 items-center justify-center rounded-lg bg-(--text)/8 text-(--text)/56 transition-colors duration-150 hover:bg-(--text)/12 hover:text-(--text) focus-visible:outline-none',
				className
			)}
		>
			{#if clipboard.copied}
				<Icon icon="heroicons:check-solid" class="size-4" aria-hidden="true" />
			{:else}
				<Icon icon="heroicons:clipboard-document-solid" class="size-4" aria-hidden="true" />
			{/if}
		</Tooltip.Trigger>
		<Tooltip.Content>
			{clipboard.copied ? 'Copied' : 'Copy'}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
