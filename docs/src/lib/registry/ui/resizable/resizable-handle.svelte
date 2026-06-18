<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as ResizablePrimitive from 'paneforge';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		withHandle = false,
		...restProps
	}: WithoutChildrenOrChild<ResizablePrimitive.PaneResizerProps> & {
		withHandle?: boolean;
	} = $props();
</script>

<ResizablePrimitive.PaneResizer
	bind:ref
	data-slot="resizable-handle"
	class={cn(
		'relative flex w-px items-center justify-center bg-(--text)/10 transition-colors duration-150 outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 hover:bg-(--text)/20 focus-visible:bg-(--text)/24 data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-2 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:translate-x-0 data-[direction=vertical]:after:-translate-y-1/2 [&[data-direction=vertical]>div]:rotate-90',
		className
	)}
	{...restProps}
>
	{#if withHandle}
		<div
			class="z-10 flex h-5 w-3 items-center justify-center rounded-sm bg-(--bg-elevated) ring-1 ring-(--text)/10"
		>
			<Icon
				icon="heroicons:ellipsis-vertical-solid"
				class="size-3 text-(--text)/40"
				aria-hidden="true"
			/>
		</div>
	{/if}
</ResizablePrimitive.PaneResizer>
