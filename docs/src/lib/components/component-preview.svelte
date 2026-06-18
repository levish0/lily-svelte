<script lang="ts">
	import type { Component } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/ui/tabs';
	import CopyButton from '$lib/components/copy-button.svelte';

	let {
		name,
		component,
		code = '',
		align = 'center',
		class: className
	}: {
		name: string;
		component?: Component;
		code?: string;
		align?: 'center' | 'start' | 'end';
		class?: string;
	} = $props();

	const Comp = $derived(component);
	// Show user-facing import paths in the displayed source.
	const displayCode = $derived(code.replaceAll('$lib/registry/', '$lib/components/').trim());
</script>

<Tabs value="preview" class="my-6 gap-0">
	<TabsList class="mb-3">
		<TabsTrigger value="preview">Preview</TabsTrigger>
		<TabsTrigger value="code">Code</TabsTrigger>
	</TabsList>

	<TabsContent value="preview">
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
	</TabsContent>

	<TabsContent value="code">
		<div class="relative">
			<pre
				class="no-scrollbar max-h-[32rem] overflow-auto rounded-3xl border border-(--text)/8 bg-(--bg-elevated) p-5 pe-14 text-sm leading-[1.6]"><code
					>{displayCode}</code
				></pre>
			<CopyButton text={displayCode} />
		</div>
	</TabsContent>
</Tabs>
