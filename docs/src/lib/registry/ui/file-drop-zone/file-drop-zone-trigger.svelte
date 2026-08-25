<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type FileDropZoneTriggerProps = HTMLAttributes<HTMLElement> & {
		ref?: HTMLElement | null;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils.js';
	import { getFileDropZoneContext } from './file-drop-zone-context.svelte.js';
	import { displaySize } from './file-drop-zone-utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: FileDropZoneTriggerProps = $props();

	const root = getFileDropZoneContext();
</script>

<svelte:element
	this={root.clickToSelect ? 'span' : 'label'}
	bind:this={ref}
	for={!root.clickToSelect && root.canUpload ? root.inputId : undefined}
	aria-disabled={!root.canUpload}
	data-slot="file-drop-zone-trigger"
	class={cn(
		!children &&
			'flex h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl bg-(--text)/5 p-6 text-center transition-colors duration-150 hover:bg-(--text)/8',
		!children && root.dragOver && 'bg-(--text)/8',
		!root.canUpload && 'pointer-events-none opacity-50',
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<div
			class="flex size-12 items-center justify-center rounded-full bg-(--text)/8 text-(--text)/56"
		>
			<Icon icon="heroicons:arrow-up-tray-solid" class="size-6" aria-hidden="true" />
		</div>
		<div class="flex flex-col gap-0.5">
			<span class="text-sm font-medium tracking-[-0.39px]">
				Drag &amp; drop files here, or click to select
			</span>
			{#if root.maxFiles || root.maxFileSize}
				<span class="text-xs tracking-[-0.3px] text-(--text)/56">
					{#if root.maxFiles}Up to {root.maxFiles} files{/if}
					{#if root.maxFiles && root.maxFileSize}
						&nbsp;({displaySize(root.maxFileSize)} each)
					{/if}
					{#if root.maxFileSize && !root.maxFiles}
						Maximum {displaySize(root.maxFileSize)}
					{/if}
				</span>
			{/if}
		</div>
	{/if}
</svelte:element>
