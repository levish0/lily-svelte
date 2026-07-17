<script lang="ts" module>
	import { cn } from '$lib/utils.js';

	export type CodeBlockVariant = 'default' | 'secondary';

	export type CodeBlockProps = {
		class?: string;
		variant?: CodeBlockVariant;
		/** The raw code to display and copy. */
		code: string;
		/** A shiki language id loaded in `shiki.ts`, e.g. `ts`, `svelte`, or `bash`. */
		lang?: string;
	};

	const variants: Record<CodeBlockVariant, string> = {
		default: 'bg-(--text)/5',
		secondary: 'bg-(--text)/8'
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { HighlighterCore } from 'shiki/core';
	import * as Tooltip from '$lib/registry/ui/tooltip/index.js';
	import { getHighlighter } from './shiki.js';

	let { class: className, variant = 'default', code, lang = 'svelte' }: CodeBlockProps = $props();

	let highlighter = $state<HighlighterCore>();
	onMount(async () => {
		highlighter = await getHighlighter();
	});

	const html = $derived.by(() => {
		if (!highlighter) return;
		try {
			return highlighter.codeToHtml(code, {
				lang,
				themes: { light: 'github-light-default', dark: 'github-dark' },
				defaultColor: false
			});
		} catch {
			// language not loaded in shiki.ts — keep the plain-text fallback
			return;
		}
	});

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout>;

	function copy() {
		navigator.clipboard.writeText(code);
		copied = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => (copied = false), 2000);
	}
</script>

<div
	data-slot="code-block"
	class={cn('relative overflow-hidden rounded-3xl', variants[variant], className)}
>
	<div
		class="no-scrollbar overflow-x-auto px-5 py-4 pe-14 font-mono text-sm leading-[1.7] [&_pre]:m-0 [&_pre]:bg-transparent [&_span]:text-(--shiki-light) dark:[&_span]:text-(--shiki-dark)"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{#if html}{@html html}{:else}<pre class="text-(--text)/72"><code>{code}</code></pre>{/if}
	</div>
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger
				aria-label="Copy code"
				onclick={copy}
				class="absolute end-3 top-3 inline-flex size-7 items-center justify-center rounded-xl bg-(--text)/8 text-(--text)/56 transition-colors duration-150 hover:bg-(--text)/12 hover:text-(--text) focus-visible:outline-none"
			>
				{#if copied}
					<Icon icon="heroicons:check-solid" class="size-4" aria-hidden="true" />
				{:else}
					<Icon icon="heroicons:clipboard-document-solid" class="size-4" aria-hidden="true" />
				{/if}
			</Tooltip.Trigger>
			<Tooltip.Content>{copied ? 'Copied' : 'Copy'}</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
