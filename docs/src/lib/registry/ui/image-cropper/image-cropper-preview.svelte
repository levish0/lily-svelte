<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { ComponentProps, Snippet } from 'svelte';
	import { Avatar } from '$lib/registry/ui/avatar/index.js';
	import { cn } from '$lib/utils.js';
	import { useImageCropperRoot } from './image-cropper.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		child,
		...restProps
	}: Omit<ComponentProps<typeof Avatar>, 'src' | 'fallback' | 'children'> & {
		/** Render your own preview from the current `src`. */
		child?: Snippet<[{ src: string }]>;
	} = $props();

	const root = useImageCropperRoot();
</script>

{#if child}
	{@render child({ src: root.src })}
{:else}
	<Avatar
		bind:ref
		src={root.src || undefined}
		alt=""
		data-slot="image-cropper-preview"
		class={cn('size-20 transition-opacity duration-150 hover:opacity-80', className)}
		{...restProps}
	>
		{#snippet fallback()}
			<Icon icon="heroicons:arrow-up-tray-solid" class="size-5" aria-hidden="true" />
			<span class="sr-only">Upload image</span>
		{/snippet}
	</Avatar>
{/if}
