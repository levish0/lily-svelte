<script lang="ts">
	import { getDesignStyle } from '$lib/design-style';
	import RegistrySource from './registry-source.svelte';
	const style = getDesignStyle();
	import type { Component, Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/ui/tabs';

	// eslint-disable-next-line svelte/no-unused-props -- mdsx injects source snippets; displayed source comes from the selected registry.
	let {
		name,
		component,
		align = 'center',
		class: className
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

<Tabs variant="segmented" value="preview" class="my-6 gap-0">
	<TabsList class="mb-3">
		<TabsTrigger value="preview">Preview</TabsTrigger>
		<TabsTrigger value="code">Code</TabsTrigger>
	</TabsList>

	<TabsContent value="preview">
		<div
			class={cn(
				'flex min-h-80 w-full justify-center rounded-3xl border border-(--text)/8 bg-(--bg) p-10',
				style.current === 'aquamarine' && 'bg-(--surface-inset) dark:bg-(--bg)',
				align === 'center' && 'items-center',
				align === 'start' && 'items-start',
				align === 'end' && 'items-end',
				className
			)}
			data-preview={name}
			data-style={style.current}
		>
			{#if Comp}
				<Comp />
			{/if}
		</div>
	</TabsContent>

	<TabsContent value="code" class="[&_.code-block]:my-0 [&_pre]:max-h-[34rem]">
		<RegistrySource {name} />
	</TabsContent>
</Tabs>
