<script lang="ts">
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
				'absolute end-3 top-3 z-10 inline-flex size-7 items-center justify-center rounded-lg bg-(--text)/6 text-(--text)/60 transition-colors duration-150 hover:bg-(--text)/10 hover:text-(--text) focus-visible:outline-none',
				className
			)}
		>
			{#if clipboard.copied}
				<!-- heroicons: check -->
				<svg
					class="size-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="m4.5 12.75 6 6 9-13.5" />
				</svg>
			{:else}
				<!-- heroicons: clipboard-document -->
				<svg
					class="size-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.7"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path
						d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
					/>
				</svg>
			{/if}
		</Tooltip.Trigger>
		<Tooltip.Content>
			{clipboard.copied ? 'Copied' : 'Copy'}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
