<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/ui/tabs';

	let {
		name,
		component,
		align = 'center',
		class: className,
		children
	}: {
		name: string;
		component?: Component;
		align?: 'center' | 'start' | 'end';
		class?: string;
		/** The shiki-highlighted source, inlined by mdsx (rehypeComponentExample). */
		children?: Snippet;
	} = $props();

	const Comp = $derived(component);
</script>

<Tabs value="preview" class="my-6 gap-0">
	<TabsList class="mb-3">
		<TabsTrigger value="preview">Preview</TabsTrigger>
		<TabsTrigger value="code">Code</TabsTrigger>
	</TabsList>

	<TabsContent value="preview">
		<div
			class={cn(
				'flex min-h-80 w-full justify-center rounded-3xl bg-(--text)/4 p-10',
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

	<TabsContent value="code" class="[&_pre]:max-h-[34rem] [&_.code-block]:my-0">
		{@render children?.()}
	</TabsContent>
</Tabs>
