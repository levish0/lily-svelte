<script lang="ts">
	import { getDesignStyle } from '$lib/design-style';
	import RegistrySource from './registry-source.svelte';
	const style = getDesignStyle();
	import type { Component } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/ui/tabs';

	let {
		name,
		component,
		align = 'center',
		surface = 'default',
		class: className
	}: {
		name: string;
		component?: Component;
		align?: 'center' | 'start' | 'end';
		/** Opt in to a contrasting canvas for elevated screen examples. */
		surface?: 'default' | 'inset';
		class?: string;
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
				surface === 'inset' &&
					style.current === 'aquamarine' &&
					'bg-(--surface-inset) dark:bg-(--bg)',
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
